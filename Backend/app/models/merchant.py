from models.account import Account
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
