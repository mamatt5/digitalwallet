from typing import Optional
from sqlmodel import Field, Relationship, SQLModel

class Category(SQLModel, table=True):
    category_id: Optional[int] = Field(default=None, primary_key=True)
    category_name: str