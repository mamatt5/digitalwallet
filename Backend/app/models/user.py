from models.account import Account
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    """
    User in the database

    Attributes:
        account_id (int): The unique identifier of the users account [PK, FK -> Account.account_id]
        first_name (str): The users first name
        last_name (str): The users last name
        account (Optional[Account]): The account for the user [One-to-One]
    """

    account_id: int | None = Field(default=None, primary_key=True, foreign_key="account.account_id")
    first_name: str
    last_name: str
    account: Account | None = Relationship(back_populates="user")
