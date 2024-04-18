from typing import Optional

from models.account import Account
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    account_id: Optional[int] = Field(default=None, primary_key=True, foreign_key="account.account_id")
    first_name: str = Field()
    last_name: str = Field()
    account: Optional[Account] = Relationship(back_populates="user")
