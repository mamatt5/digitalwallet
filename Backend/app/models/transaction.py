from sqlite3 import Date
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel


class Transaction(SQLModel, table=True):
    transaction_id: Optional[int] = Field(default=None, primary_key=True)
    vendor_name: str = Field(index=True)
    date: str = Field(index=True)
    amount: int = Field(index=True)
    category_name: str = Field(index=True)

    card_id: int = Field(default=None, foreign_key='card.card_id')
    sender: int = Field(default=None, foreign_key='wallet.wallet_id')
    recipient: int = Field(default=None, foreign_key='wallet.wallet_id')

