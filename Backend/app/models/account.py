from enum import Enum
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from models.merchant import Merchant
    from models.user import User


class AccountType(str, Enum):
    MERCHANT = "merchant"
    USER = "user"


class Account(SQLModel, table=True):
    account_id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password: str
    account_type: AccountType = Field(index=True)
    merchant: Optional["Merchant"] = Relationship(back_populates="account", sa_relationship_kwargs={"uselist": False})
    user: Optional["User"] = Relationship(back_populates="account", sa_relationship_kwargs={"uselist": False})
