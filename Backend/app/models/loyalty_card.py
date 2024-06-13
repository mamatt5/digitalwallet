from typing import Optional

from sqlmodel import Field, Relationship, SQLModel


class LoyaltyCard(SQLModel, table=True):
    loyalty_card_id: int | None = Field(default=None, primary_key=True)
    member_name: str
    card_number: str = Field(index=True, unique=True)
    card_expiry: str = Field(index=True)
    wallet_id: int = Field(foreign_key="wallet.wallet_id")
    wallet: Optional["Wallet"] = Relationship(back_populates="loyalty_cards")
    # vendor_id
    # points
