from typing import List
from sqlmodel import Field, Relationship, SQLModel

from models.wallet import Wallet

class Card(SQLModel, table=True):

    card_id: int | None = Field(default=None, primary_key=True)
    card_number: str = Field(index=True, unique=True)
    card_expiry: str = Field(index=True)
    # card_cvv: str = Field(index=True)
    wallet_id: int = Field(foreign_key="wallet.wallet_id")
    wallet: Wallet | None = Relationship(back_populates="cards")