from typing import List, Union

from faker import Faker
from models.account import Account, AccountType
from models.merchant import Merchant
from models.user import User
from services.auth_service import hash_password
from sqlmodel import Session

fake = Faker()


def generate_dummy_data(num_records: int) -> list[Union[Merchant, User]]:
    """
    Generates a list of dummy Account objects with a mix of users and merchants.

    Args:
        num_records: The number of accounts to generate.

    Returns:
        A list of dummy Account, Merchant, or User objects.
    """
    data = []
    for _ in range(num_records):
        account_type = AccountType.MERCHANT if fake.boolean() else AccountType.USER
        account_data = {
            "email": fake.email(),
            "password": hash_password(fake.password()),
            "phone_number": fake.phone_number(),
            "account_type": account_type,
        }
        account = Account(**account_data)

        if account_type == AccountType.MERCHANT:
            merchant_data = {
                "company_name": fake.company(),
                "ABN": fake.msisdn(),
            }
            merchant = Merchant(**merchant_data)
            merchant.account = account
            data.append(merchant)
        else:
            user_data = {
                "first_name": fake.first_name(),
                "last_name": fake.last_name(),
            }
            user = User(**user_data)
            user.account = account
            data.append(user)

    return data


def insert_dummy_data(session: Session, data: List[Account]) -> None:
    """
    Inserts a list of dummy Account objects into the database.

    Args:
        session: The SQLModel session object.
        data: A list of Account objects to insert.
    """

    session.add_all(data)
    session.commit()
