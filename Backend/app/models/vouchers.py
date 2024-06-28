from typing import List, Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

from models.card import Card
from models.UserVoucherLink import UserVoucherLink

if TYPE_CHECKING:
    from models.merchant import Merchant
    from models.user import User


class Voucher(SQLModel, table=True):
    voucher_id: int | None = Field(default=None, primary_key=True)
    description: str | None = Field(default=None)
    discount : int = Field(default=None)
    price : int = Field(default = None)


    merchant_id: int = Field(foreign_key="merchant.account_id")
    merchant: Optional["Merchant"] | None = Relationship(back_populates="vouchers")
    
    users: List["User"] = Relationship(back_populates="vouchers", link_model=UserVoucherLink)

    