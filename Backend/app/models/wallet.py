from typing import List
from sqlmodel import Field, Relationship, SQLModel

class Wallet(SQLModel, table=True):

    wallet_id: int | None = Field(default=None, primary_key=True)