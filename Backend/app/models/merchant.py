from models.account import Account
from models.category import Category
from models.qr_image import QRImage
from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel


class Merchant(SQLModel, table=True):
    """
    Merchant in the database

    Attributes:
        account_id (int): The unique identifier of the merchants account [PK, FK -> Account.account_id]
        company_name (str): The company name of the merchant
        ABN (str): The Australian Business Number (ABN) of the merchant
        account (Optional[Account]): The account associated with the merchant [One-to-One]
    """

    account_id: int | None = Field(default=None, primary_key=True, foreign_key="account.account_id")
    company_name: str
    ABN: str
    account: Account | None = Relationship(back_populates="merchant")
    category_id: Optional[int] = Field(default=None, foreign_key='category.category_id')
    category: Category | None = Relationship(back_populates="merchants")
    qr_image: QRImage | None = Relationship(back_populates="merchant")
