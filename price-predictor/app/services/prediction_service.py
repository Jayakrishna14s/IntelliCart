import pandas as pd

from app.services.model_loader import model_bundle
from app.services.feature_engineering import build_features


def safe_encode_value(encoder, value):
    """
    Safely encode values.
    If unseen label appears, fallback to first known class.
    """
    value = str(value)
    if value in encoder.classes_:
        return encoder.transform([value])[0]
    return encoder.transform([encoder.classes_[0]])[0]


def encode_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Apply saved label encoders to categorical columns.
    """
    for col, encoder in model_bundle.encoders.items():
        if col in df.columns:
            df[col] = df[col].apply(lambda x: safe_encode_value(encoder, x))
    return df


def compute_base_price(df: pd.DataFrame) -> pd.Series:
    """
    Compute handcrafted base price formula.
    """
    config = model_bundle.base_formula

    return (
        config["lag_1_weight"] * df["price_lag_1"] +
        config["rolling_mean_7_weight"] * df["rolling_mean_7"] +
        config["market_avg_weight"] * df["product_avg_price_today"] +
        config["cost_markup_weight"] * (
            df["estimated_cost_price"] * config["cost_markup_multiplier"]
        )
    )


def predict_price(input_data):
    """
    Full prediction pipeline:
    1. Build features
    2. Encode categorical fields
    3. Compute base price
    4. Predict residual
    5. Return final output
    """
    # Build feature dataframe
    df = build_features(input_data)

    # Encode categorical columns
    df = encode_features(df)

    # Compute base price
    df["base_price_prediction"] = compute_base_price(df)

    # Reorder columns to match training
    df = df[model_bundle.feature_columns]

    # Predict residual
    predicted_residual = model_bundle.residual_model.predict(df)[0]

    # Final prediction
    base_price = df["base_price_prediction"].values[0]
    final_price = base_price + predicted_residual

    return {
        "predicted_price": round(float(final_price), 2),
        "base_price": round(float(base_price), 2),
        "residual_adjustment": round(float(predicted_residual), 2)
    }