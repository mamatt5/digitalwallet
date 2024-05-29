import logging
import random
from typing import Dict

from faker import Faker
from fastapi import status
from fastapi.testclient import TestClient
from main import app
from models.account import AccountType
from schemas.auth_schema import AuthResponse, RegisterRequest

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

fake = Faker()


def create_register_request(account_type: AccountType) -> RegisterRequest:
    logger.info(f"Creating register request for account type: {account_type}")
    if account_type == AccountType.MERCHANT:
        return RegisterRequest(
            email=fake.email(),
            password='password',
            phone_number=fake.phone_number(),
            account_type=account_type,
            company_name=fake.company(),
            ABN=fake.msisdn(),
            first_name="",
            last_name="",
        )
    else:
        return RegisterRequest(
            email=fake.email(),
            password='password',
            phone_number=fake.phone_number(),
            account_type=account_type,
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            company_name="",
            ABN="",
        )


def create_card_data() -> Dict:
    logger.info("Creating card data")
    return {
        "card_number": fake.credit_card_number(),
        "card_expiry": fake.credit_card_expire(),
        "card_cvv": fake.credit_card_security_code(),
    }


def create_transaction_data() -> Dict:
    logger.info("Creating transaction data")
    return {
        "date": fake.date_time_this_year(before_now=True),
        "amount": random.randint(1, 1000),
    }


def register_account(client, register_request: RegisterRequest) -> AuthResponse:
    logger.info(f"Registering account: {register_request}")
    response = client.post("/auth/register", json=register_request.model_dump())
    assert response.status_code == status.HTTP_200_OK, f"Account registration failed: {response.text}"
    logger.info(f"Account registered successfully: {response.json()}")
    return AuthResponse(**response.json())


def add_card_to_wallet(client, auth_response: AuthResponse, card_data: Dict) -> None:
    logger.info(f"Adding card to wallet: {card_data}")
    headers = {"Authorization": f"Bearer {auth_response.token.access_token}"}
    card_data["wallet_id"] = auth_response.account.wallet.wallet_id
    response = client.post("/cards/addcard", json=card_data, headers=headers)
    assert response.status_code == status.HTTP_200_OK, f"Adding card failed: {response.text}"
    logger.info("Card added to wallet successfully")


def generate_dummy_data(client: TestClient, num_records: int) -> None:
    logger.info(f"Generating dummy data for {num_records} records")
    for _ in range(num_records):
        account_type = AccountType.MERCHANT if fake.boolean() else AccountType.USER
        register_request = create_register_request(account_type)
        auth_response = register_account(client, register_request)
        card_data = create_card_data()
        add_card_to_wallet(client, auth_response, card_data)


def load_dummy_data(num_records: int):
    logger.info(f"Loading dummy data for {num_records} records")
    with TestClient(app) as client:
        generate_dummy_data(client, num_records)


if __name__ == "__main__":
    num_records = 10
    load_dummy_data(num_records)

    with TestClient(app) as client:
        register_request = RegisterRequest(
            email="beza@example.com",
            password='Password1',
            phone_number=fake.phone_number(),
            account_type="user",
            first_name="Beza",
            last_name="Charles",
            company_name="",
            ABN="",
        )
        register_account(client, register_request)

        register_request = RegisterRequest(
            email="robert@example.com",
            password='Password1',
            phone_number=fake.phone_number(),
            account_type="user",
            first_name="Robert",
            last_name="Donald",
            company_name="",
            ABN="",
        )
        register_account(client, register_request)

        register_request = RegisterRequest(
            email="lorascafe@example.com",
            password='Password1',
            phone_number=fake.phone_number(),
            account_type="merchant",
            company_name="Lora's Cafe",
            ABN=fake.msisdn(),
            first_name="",
            last_name="",
        )
        register_account(client, register_request)

        register_request = RegisterRequest(
            email="matthew@example.com",
            password='Password1',
            phone_number=fake.phone_number(),
            account_type="user",
            first_name="Matthew",
            last_name="Chanco",
            company_name="",
            ABN="",
        )
        register_account(client, register_request)

        register_request = RegisterRequest(
            email="bob@example.com",
            password='Password1',
            phone_number=fake.phone_number(),
            account_type="user",
            first_name="Bob",
            last_name="Tilman",
            company_name="",
            ABN="",
        )
        register_account(client, register_request)
