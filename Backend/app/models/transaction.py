import datetime
from typing import Optional
from sqlmodel import Field, Relationship, SQLModel

from models.wallet import Wallet
from models.merchant import Merchant


class Transaction(SQLModel, table=True):
    transaction_id: int | None = Field(default=None, primary_key=True)
    vendor: int = Field(default=None, foreign_key='account.account_id')
    date: str = Field(default=None)
    time: str = Field(default=None)
    amount: float = Field(default=0)

    card_id: int = Field(default=None, foreign_key='card.card_id')
    sender: int = Field(default=None, foreign_key='wallet.wallet_id')
    recipient: int = Field(default=None, foreign_key='wallet.wallet_id')
