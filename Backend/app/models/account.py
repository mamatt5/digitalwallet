from enum import Enum
from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel

# Avoids circular imports
if TYPE_CHECKING:
    from models.merchant import Merchant
    from models.user import User


class AccountType(str, Enum):
    """Enum for the type of account"""

    MERCHANT = "merchant"
    USER = "user"


class Account(SQLModel, table=True):
    """
    Account in the database

    Attributes:
        account_id (int): The unique identifier of the account [PK]
        email (str): The email address associated with the account
        password (str): The hashed password of the account
        account_type (AccountType): The type of the account (merchant or user)
        merchant (Optional[Merchant]): The merchant associated with the account [One-to-One]
        user (Optional[User]): The user associated with the account [One-to-One]
    """

    account_id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password: str
    phone_number: str = Field(index=True, unique=True)
    account_type: AccountType = Field(index=True)
    merchant: Optional["Merchant"] = Relationship(back_populates="account", sa_relationship_kwargs={"uselist": False})
    user: Optional["User"] = Relationship(back_populates="account", sa_relationship_kwargs={"uselist": False})
