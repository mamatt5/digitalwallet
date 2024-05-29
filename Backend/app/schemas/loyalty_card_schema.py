from pydantic import BaseModel, Field


class LoyaltyCardInfo(BaseModel):
    card_number: str = Field(..., description="Card Number")
    card_expiry: str = Field(..., description="Card Expiry")
    member_name: str = Field(..., description="Member Name")
    loyalty_card_id: int = Field(..., description="Loyalty Card ID")