from typing import List
from sqlmodel import Field, Relationship, SQLModel

from models.account import Account
from models.card import Card

class Wallet(SQLModel, table=True):

    wallet_id: int | None = Field(default=None, primary_key=True)
    account_id: int = Field(foreign_key="account.account_id")
    account: Account | None = Relationship(back_populates="wallet")
    cards: List[Card] = Relationship(back_populates="wallet")