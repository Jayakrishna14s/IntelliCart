import numpy as np
import pandas as pd
from datetime import datetime


def build_features(input_data):
    """
    Converts raw API input into model-ready feature dictionary.
    """

    price_history = input_data.price_history

    if len(price_history) < 7:
        raise ValueError("price_history must contain at least 7 price points.")

    # -------------------------
    # Core price values
    # -------------------------
    price = price_history[-1]
    price_lag_1 = price_history[-1]
    price_lag_2 = price_history[-2]
    price_lag_3 = price_history[-3]
    price_lag_7 = price_history[-7]

    rolling_mean_3 = float(np.mean(price_history[-3:]))
    rolling_mean_7 = float(np.mean(price_history[-7:]))
    rolling_std_7 = float(np.std(price_history[-7:]))

    price_change_1 = price_lag_1 - price_lag_2
    price_change_pct_1 = (
        price_change_1 / price_lag_2 if price_lag_2 != 0 else 0.0
    )

    # -------------------------
    # Time features
    # -------------------------
    now = datetime.now()

    day_of_week = now.weekday()
    month = now.month
    day = now.day
    week_of_year = now.isocalendar()[1]
    is_weekend = 1 if day_of_week in [5, 6] else 0
    hour = now.hour

    # -------------------------
    # Marketplace approximations
    # (can later be replaced by DB-driven values)
    # -------------------------
    product_avg_price_today = rolling_mean_7
    product_min_price_today = float(min(price_history[-7:]))
    product_max_price_today = float(max(price_history[-7:]))

    store_price_vs_market_avg = price - product_avg_price_today
    store_price_vs_market_min = price - product_min_price_today

    # Since we don't yet have real cross-store rank at inference time
    listing_price_rank_within_product = 1.0

    # -------------------------
    # Final feature dict
    # -------------------------
    features = {
        "listing_id": input_data.listing_id,
        "product_id": input_data.product_id,
        "store_id": input_data.store_id,
        "brand": input_data.brand,
        "category_id": input_data.category_id,
        "name": input_data.product_name,
        "price": price,
        "price_lag_1": price_lag_1,
        "price_lag_2": price_lag_2,
        "price_lag_3": price_lag_3,
        "price_lag_7": price_lag_7,
        "rolling_mean_3": rolling_mean_3,
        "rolling_mean_7": rolling_mean_7,
        "rolling_std_7": rolling_std_7,
        "price_change_1": price_change_1,
        "price_change_pct_1": price_change_pct_1,
        "day_of_week": day_of_week,
        "month": month,
        "day": day,
        "week_of_year": week_of_year,
        "is_weekend": is_weekend,
        "hour": hour,
        "latitude": input_data.latitude,
        "longitude": input_data.longitude,
        "estimated_cost_price": input_data.estimated_cost_price,
        "seller_score": input_data.seller_score,
        "product_rating": input_data.product_rating,
        "prime_eligible": input_data.prime_eligible,
        "product_avg_price_today": product_avg_price_today,
        "product_min_price_today": product_min_price_today,
        "product_max_price_today": product_max_price_today,
        "store_price_vs_market_avg": store_price_vs_market_avg,
        "store_price_vs_market_min": store_price_vs_market_min,
        "listing_price_rank_within_product": listing_price_rank_within_product
    }

    return pd.DataFrame([features])