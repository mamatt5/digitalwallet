from typing import Optional

from sqlmodel import Field, Relationship, SQLModel

from models.account import Account


class User(SQLModel, table=True):
    account_id: Optional[int] = Field(default=None, primary_key=True, foreign_key="account.account_id")
    first_name: str = Field()
    last_name: str = Field()
    account: Optional[Account] = Relationship(back_populates="user")
