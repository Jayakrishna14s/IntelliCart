from pydantic import BaseModel, Field
from typing import List


class PredictionInput(BaseModel):
    listing_id: int = Field(..., example=101)
    product_id: int = Field(..., example=55)
    store_id: int = Field(..., example=12)

    brand: str = Field(..., example="Samsung")
    category_id: int = Field(..., example=1)
    product_name: str = Field(..., example="Samsung Wireless Earbuds Pro Black")

    latitude: float = Field(..., example=17.3850)
    longitude: float = Field(..., example=78.4867)

    estimated_cost_price: float = Field(..., example=1100.0)
    seller_score: float = Field(..., example=4.5)
    product_rating: float = Field(..., example=4.2)
    prime_eligible: int = Field(..., example=1)

    price_history: List[float] = Field(
        ...,
        min_length=7,
        example=[1599, 1549, 1499, 1529, 1489, 1459, 1499]
    )


class PredictionResponse(BaseModel):
    predicted_price: float
    base_price: float
    residual_adjustment: float