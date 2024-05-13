import datetime
from typing import Optional
from sqlmodel import Field, Relationship, SQLModel

from models.wallet import Wallet
from models.merchant import Merchant


class Transaction(SQLModel, table=True):
    transaction_id: int | None = Field(default=None, primary_key=True)
    vendor: Optional["Merchant"] | None = Relationship(back_populates="transactions")
    date: datetime.datetime = Field(default=datetime.datetime.now)
    amount: float

    card_id: int = Field(default=None, foreign_key='card.card_id')
    sender: Optional["Wallet"] | None = Relationship(back_populates="transactions")
    recipient: Optional["Wallet"] | None = Relationship(back_populates="transactions")
