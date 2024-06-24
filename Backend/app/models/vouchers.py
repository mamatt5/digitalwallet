from typing import List, Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

from models.card import Card
from models.user import User

if TYPE_CHECKING:
    from models.merchant import Merchant


class Voucher(SQLModel, table=True):

    voucher_id: int | None = Field(default=None, primary_key=True)
    description: str | None = Field(default=None)
    merchant_id: int = Field(foreign_key="account.account_id")
    merchant: Optional["Merchant"] | None = Relationship(back_populates="vouchers")
    

    