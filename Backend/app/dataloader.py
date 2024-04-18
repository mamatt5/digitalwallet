# Faker

from faker import Faker
from models.account import Account
from models.merchant import Merchant
from models.user import User
from typing import Union
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from typing import List

fake = Faker()


def generate_dummy_data(num_records: int) -> list[Union[Account, Merchant, User]]:
  """
  Generates a list of dummy Account objects with a mix of users and merchants.

  Args:
      num_records: The number of accounts to generate.

  Returns:
      A list of dummy Account, Merchant, or User objects.
  """
  data = []
  for _ in range(num_records):
    account_type = "merchant" if fake.boolean() else "user"
    account_data = {
        "email": fake.email(),
        "password": fake.password(),
    }

    if account_type == "merchant":
      account_data.update({
          "company_name": fake.company(),
          "ABN": fake.msisdn(),
      })
      account = Merchant(**account_data)
    else:
      account_data.update({
          "first_name": fake.first_name(),
          "last_name": fake.last_name(),
      })
      account = User(**account_data)

    data.append(account)

  return data

def insert_dummy_data(engine: create_engine, data: List[Account]) -> None:
    """
    Inserts a list of dummy Account objects into the database.

    Args:
        engine: The SQLAlchemy engine object.
        data: A list of Account objects to insert.
    """
    with Session(engine) as session:
        session.add_all(data)
        session.commit()

if __name__ == "__main__":
    engine = create_engine("sqlite:///database.db")

    num_records = 10
    dummy_data = generate_dummy_data(num_records)

    insert_dummy_data(engine, dummy_data)