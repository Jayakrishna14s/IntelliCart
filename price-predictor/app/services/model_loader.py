import joblib
from pathlib import Path


# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODEL_DIR = BASE_DIR / "model_bundle"


class ModelBundle:
    def __init__(self):
        self.residual_model = None
        self.encoders = None
        self.feature_columns = None
        self.base_formula = None

    def load(self):
        self.residual_model = joblib.load(MODEL_DIR / "intellicart_residual_model.pkl")
        self.encoders = joblib.load(MODEL_DIR / "intellicart_label_encoders.pkl")
        self.feature_columns = joblib.load(MODEL_DIR / "intellicart_feature_columns.pkl")
        self.base_formula = joblib.load(MODEL_DIR / "intellicart_base_formula.pkl")


# Singleton instance
model_bundle = ModelBundle()
model_bundle.load()