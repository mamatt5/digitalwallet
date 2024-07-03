from typing import List
from sqlmodel import Field, Relationship, SQLModel

from models.loyalty_card import LoyaltyCard
from models.account import Account
from models.card import Card
 

class Wallet(SQLModel, table=True):
    wallet_id: int | None = Field(default=None, primary_key=True)
    account: Account | None = Relationship(back_populates="wallet")
    account_id: int = Field(foreign_key="account.account_id")

    cards: List[Card] = Relationship(back_populates="wallet")

    loyalty_cards: List[LoyaltyCard] = Relationship(back_populates="wallet")
    ap_points: int = Field(default=0)