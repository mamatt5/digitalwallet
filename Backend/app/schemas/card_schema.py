from pydantic import BaseModel, Field

class CardInfo(BaseModel):
    card_number: str = Field(..., description="Card Number")
    card_expiry: str = Field(..., description="Card Expiry")