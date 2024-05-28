import datetime
from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel

from models.wallet import Wallet
from models.merchant import Merchant


class Transaction(SQLModel, table=True):
    transaction_id: int | None = Field(default=None, primary_key=True)
    vendor: int = Field(default=None, foreign_key='account.account_id')
    date: str = Field(default=None)
    time: str = Field(default=None)
    amount: str = Field(default=None)
    description: str | None = Field(default=None)
    card_id: int = Field(default=None, foreign_key='card.card_id')
    sender: int = Field(default=None, foreign_key='wallet.wallet_id')
    recipient: int = Field(default=None, foreign_key='wallet.wallet_id')
    items: List["Item"] = Relationship(back_populates="transaction")


class Item(SQLModel, table=True):
    item_id: int | None = Field(default=None, primary_key=True)
    transaction_id: int = Field(default=None, foreign_key='transaction.transaction_id')
    name: str = Field(default=None)
    price: str = Field(default=None)
    quantity: int = Field(default=None)
    transaction: Optional["Transaction"] = Relationship(back_populates="items")