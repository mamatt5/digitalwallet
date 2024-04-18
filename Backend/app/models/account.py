from typing import Optional, Union, TYPE_CHECKING
from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from models.merchant import Merchant
    from models.user import User

class Account(SQLModel, table=True):
    account_id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password: str
    account_type: str = Field(index=True)
    merchant: Optional["Merchant"] = Relationship(back_populates="account", sa_relationship_kwargs={"uselist": False})
    user: Optional["User"] = Relationship(back_populates="account", sa_relationship_kwargs={"uselist": False})