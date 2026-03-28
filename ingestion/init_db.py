import os
import csv
import json
import psycopg2
from psycopg2 import sql
from psycopg2.extras import execute_values, Json
from dotenv import load_dotenv
from table_config import TABLES

load_dotenv()

DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "dbname": "intellicart",
    "user": "postgres",
    "password": "root"
}

TRUNCATE_BEFORE_LOAD = False
USE_CASCADE_TRUNCATE = True

DEFAULT_PASSWORD_HASH = "$2a$10$hzmF4CtDibj6otZhAHcxue1dCSSKr4Cel8oNMTBzgBJCL3.0cqG5C"
DEFAULT_PRODUCT_IMAGE = "https://www.shutterstock.com/image-vector/3d-shopping-cart-percentages-concepts-600nw-2659202387.jpg"


TABLE_COLUMN_MAPPING = {
    "category": ["id", "name", "parent_id", "image"],

    "users": ["id", "email", "first_name", "last_name", "password", "role"],

    "store": ["id", "description", "latitude", "location", "longitude", "name", "owner_id"],

    "product": ["id", "attributes", "brand", "description", "image", "name", "sku", "category_id"],

    "product_listing": ["id", "attributes", "currency", "price", "product_id", "store_id"],

    "price_history": ["id", "created_at", "price", "listing_id"]
}


def get_connection():
    return psycopg2.connect(**DB_CONFIG)


def table_exists(cursor, table_name):
    cursor.execute("""
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name = %s
        );
    """, (table_name,))
    return cursor.fetchone()[0]


def truncate_table(cursor, table_name):
    if USE_CASCADE_TRUNCATE:
        query = sql.SQL("TRUNCATE TABLE {} RESTART IDENTITY CASCADE").format(
            sql.Identifier(table_name)
        )
    else:
        query = sql.SQL("TRUNCATE TABLE {} RESTART IDENTITY").format(
            sql.Identifier(table_name)
        )
    cursor.execute(query)


def reset_sequence(cursor, table_name):
    sequence_name = f"{table_name}_id_seq"

    cursor.execute("""
        SELECT EXISTS (
            SELECT 1
            FROM pg_class
            WHERE relkind = 'S'
              AND relname = %s
        );
    """, (sequence_name,))
    exists = cursor.fetchone()[0]

    if not exists:
        print(f"⚠️  Sequence not found for {table_name}: {sequence_name}")
        return

    query = sql.SQL("""
        SELECT setval(
            %s,
            COALESCE((SELECT MAX(id) FROM {}), 1),
            true
        );
    """).format(sql.Identifier(table_name))

    cursor.execute(query, (sequence_name,))
    print(f"🔁 Sequence reset for {table_name}")


def count_rows(cursor, table_name):
    query = sql.SQL("SELECT COUNT(*) FROM {}").format(sql.Identifier(table_name))
    cursor.execute(query)
    return cursor.fetchone()[0]


def safe_json_load(value):
    if value is None or value == "":
        return {}
    if isinstance(value, dict):
        return value
    try:
        return json.loads(value)
    except Exception:
        print(f"⚠️ Invalid JSON encountered: {value}")
        return {}



def transform_row(table_name, row):
    """
    Transforms CSV row into DB-compatible tuple
    according to your schema.
    """

    if table_name == "category":
        return (
            int(row["id"]) if row["id"] else None,
            row["name"],
            int(float(row["parent_id"])) if row["parent_id"] else None,
            "https://www.shutterstock.com/image-vector/3d-shopping-cart-percentages-concepts-600nw-2659202387.jpg"
        )

    elif table_name == "users":
        return (
            int(row["id"]) if row["id"] else None,
            row["email"],
            row["first_name"],
            row["last_name"],
            DEFAULT_PASSWORD_HASH,   # override all passwords
            row["role"]              # enum string, keep as-is
        )

    elif table_name == "store":
        return (
            int(row["id"]) if row["id"] else None,
            row["description"],
            float(row["latitude"]) if row["latitude"] else None,
            row["location"],
            float(row["longitude"]) if row["longitude"] else None,
            row["name"],
            int(row["owner_id"]) if row["owner_id"] else None
        )

    elif table_name == "product":
        return (
            int(row["id"]) if row["id"] else None,
            Json(safe_json_load(row["attributes"])),   # jsonb
            row["brand"],
            row["description"],
            DEFAULT_PRODUCT_IMAGE,                     # injected image
            row["name"],
            row["sku"],
            int(row["category_id"]) if row["category_id"] else None
        )

    elif table_name == "product_listing":
        return (
            int(row["id"]) if row["id"] else None,
            Json(safe_json_load(row["attributes"])),   # jsonb
            row["currency"],                           # string, safe for Spring EnumType.STRING? no enum mentioned, keep raw string
            float(row["price"]) if row["price"] else None,
            int(row["product_id"]) if row["product_id"] else None,
            int(row["store_id"]) if row["store_id"] else None
        )

    elif table_name == "price_history":
        return (
            int(row["id"]) if row["id"] else None,
            row["created_at"],                         # ignore updated_at
            float(row["price"]) if row["price"] else None,
            int(row["listing_id"]) if row["listing_id"] else None
        )

    else:
        raise ValueError(f"No transform logic found for table: {table_name}")


def load_table_data(cursor, table_name, csv_file):
    columns = TABLE_COLUMN_MAPPING[table_name]
    rows_to_insert = []

    with open(csv_file, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)

        for row in reader:
            transformed = transform_row(table_name, row)
            rows_to_insert.append(transformed)

    if not rows_to_insert:
        print(f"⚠️ No rows found in {csv_file}")
        return

    insert_query = sql.SQL("INSERT INTO {} ({}) VALUES %s").format(
        sql.Identifier(table_name),
        sql.SQL(", ").join(map(sql.Identifier, columns))
    )

    execute_values(cursor, insert_query.as_string(cursor.connection), rows_to_insert, page_size=1000)


def initialize_tables():
    conn = None
    try:
        conn = get_connection()
        conn.autocommit = False
        cursor = conn.cursor()

        print("🚀 Starting PostgreSQL database initialization...\n")

        for table in TABLES:
            table_name = table["table_name"]
            csv_file = table["csv_file"]
            reset_seq = table.get("reset_sequence", False)

            print(f"📦 Processing table: {table_name}")

            if not os.path.exists(csv_file):
                print(f"❌ CSV file not found: {csv_file}")
                print("-" * 60)
                continue

            if not table_exists(cursor, table_name):
                print(f"❌ Table does not exist in DB: {table_name}")
                print("-" * 60)
                continue

            try:
                if TRUNCATE_BEFORE_LOAD:
                    print(f"🧹 Truncating {table_name}...")
                    truncate_table(cursor, table_name)

                print(f"⬇️ Loading CSV: {csv_file}")
                load_table_data(cursor, table_name, csv_file)

                if reset_seq:
                    reset_sequence(cursor, table_name)

                row_count = count_rows(cursor, table_name)
                print(f"✅ Loaded {row_count} rows into {table_name}")

                conn.commit()

            except Exception as table_error:
                conn.rollback()
                print(f"❌ Failed loading table {table_name}: {table_error}")

            print("-" * 60)

        cursor.close()
        print("\n🎯 Database initialization completed successfully.")

    except Exception as e:
        print(f"🔥 Fatal error: {e}")

    finally:
        if conn:
            conn.close()
            print("🔌 DB connection closed.")


if __name__ == "__main__":
    initialize_tables()
    