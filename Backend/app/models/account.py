from typing import Optional

from sqlmodel import Field, SQLModel


class Account(SQLModel, table=True):
    account_id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password: str
