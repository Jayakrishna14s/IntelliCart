from fastapi import APIRouter, HTTPException

from app.schemas.prediction import PredictionInput, PredictionResponse
from app.services.prediction_service import predict_price

router = APIRouter()


# -------------------------
# Health Check Endpoint
# -------------------------
@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Intellicart Pricing Service is running"
    }


# -------------------------
# Prediction Endpoint
# -------------------------
@router.post("/predict", response_model=PredictionResponse)
def predict(input_data: PredictionInput):
    try:
        result = predict_price(input_data)
        return result

    except Exception as e:
        # In production, log this properly
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )