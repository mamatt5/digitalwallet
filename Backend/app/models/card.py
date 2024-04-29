from typing import List
from sqlmodel import Field, Relationship, SQLModel

class Card(SQLModel, table=True):

    card_id: int | None = Field(default=None, primary_key=True)
    card_number: str = Field(index=True, unique=True)
    card_expiry: str = Field(index=True)
    # card_cvv: str = Field(index=True)