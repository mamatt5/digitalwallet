import random
from typing import List, Union

from faker import Faker
from models.card import Card
from models.wallet import Wallet
from models.account import Account, AccountType
from models.merchant import Merchant
from models.user import User
from models.transaction import Transaction
from services.auth_service import hash_password
from sqlmodel import Session

fake = Faker()


def generate_dummy_data(session: Session, num_records: int) -> list[Union[Merchant, User, Wallet, Card, Transaction]]:
    data = []
    for _ in range(num_records):
        # generate account data
        account_type = AccountType.MERCHANT if fake.boolean() else AccountType.USER
        account_data = {
            "email": fake.email(),
            "password": hash_password(fake.password()),
            "phone_number": fake.phone_number(),
            "account_type": account_type,
        }
        account = Account(**account_data)

        # generate wallet data
        wallet = Wallet()
        wallet.account = account
        account.wallet = wallet

        # generate card data
        card_data = {
            "card_number": fake.credit_card_number(),
            "card_expiry": fake.credit_card_expire(),
            "card_cvv": fake.credit_card_security_code(),
        }

        card = Card(**card_data)
        card.wallet = wallet
        wallet.cards.append(card)

        # generate user and merchant data
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

        # generate transaction data
        transaction_data = {
            "vendor_name": fake.company(),
            "date": fake.date(),
            "amount": random.randint(1, 10000),
            "category_name": fake.name(),

            "card_id": random.randint(1, 10000),
            "sender_wallet_id": random.randint(1, 10000),
            "recipient_wallet_id": random.randint(1, 10000)
        }
        transaction = Transaction(**transaction_data)

        # data.append(transaction)
        data.append(wallet)
        data.append(card)

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
