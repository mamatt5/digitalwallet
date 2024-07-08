from pydantic import BaseModel, Field


class CardInfo(BaseModel):
    card_number: str = Field(..., description="Card Number")
    card_expiry: str = Field(..., description="Card Expiry")
    card_id: int = Field(..., description="Card ID")

class CardRegisterRequest(BaseModel):
    card_number: str = Field(..., description="Card Number")
    card_expiry: str = Field(..., description="Card Expiry")
    card_cvv: str = Field(..., description="Card CVV")
    wallet_id: int = Field(..., description="Wallet ID")
