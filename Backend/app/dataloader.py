import logging
import random
from typing import Dict, List

from faker import Faker
from fastapi import status
from fastapi.testclient import TestClient
from main import app
from models.account import AccountType
from schemas.auth_schema import AuthResponse, RegisterRequest
from schemas.card_schema import CardRegisterRequest
from schemas.voucher_schema import VoucherRequest

logging.basicConfig(filename='app.log', 
                    filemode='w', 
                    format='%(asctime)s - %(levelname)s - %(message)s', 
                    level=logging.DEBUG)

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

def register_card(client, card_register_request: CardRegisterRequest) -> None:
    logger.info(f"Registering card: {card_register_request}")
    response = client.post("/cards/addcard", json=card_register_request.model_dump())
    assert response.status_code == status.HTTP_200_OK, f"Card registration failed: {response.text}"
    logger.info("Card registered successfully")

def add_voucher_to_merchant(client, add_voucher_to_merchant_request: VoucherRequest) -> None:
    logger.info(f"Adding Voucher to Merchant: {add_voucher_to_merchant_request}")
    logger.info("hi")
    response = client.post("/vouchers/addvoucher", json=add_voucher_to_merchant_request.model_dump())
    logger.info("bye")    
    assert response.status_code == status.HTTP_200_OK, f"Adding Voucher to merchant failed: {response.text}"
    logger.info("Voucher Creation successfully")


def create_transaction_data(users: List[int]) -> Dict:
    logger.info("Creating transaction data")
    randomDatetime = fake.date_time_this_year(before_now=True)
    customer = 1
    if len(users) > 0:
        customer = random.choice(users)
    return {
        "vendor": 13,
        "date": randomDatetime.strftime("%x"),
        "time": randomDatetime.strftime("%X"),
        "amount": str(round(random.uniform(5, 20), 2)),
        "description": "Test transaction",
        "card_id": customer,
        "sender": customer,
        "recipient": 13,
        "items": [],
    }


def add_transaction_data(client, num_transactions: int, users: List[int]) -> None:
    transactions = list()
    for _ in range(num_transactions):
        transactions.append(create_transaction_data(users))
    response = client.post("/transactions/addtransactions", json=transactions)
    assert response.status_code == status.HTTP_200_OK, f"Transactions add failed: {response.text}"
    logger.info(f"Transactions added successfully")


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





def generate_dummy_data(client: TestClient, num_records: int) -> List[int]:
    logger.info(f"Generating dummy data for {num_records} records")
    users = list()
    for i in range(num_records):
        account_type = AccountType.MERCHANT if fake.boolean() else AccountType.USER
        if account_type == AccountType.USER:
            users.append(i + 1)
        register_request = create_register_request(account_type)
        auth_response = register_account(client, register_request)
        card_data = create_card_data()
        add_card_to_wallet(client, auth_response, card_data)
    return users


def load_dummy_data(num_records: int) -> List[int]:
    logger.info(f"Loading dummy data for {num_records} records")
    with TestClient(app) as client:
        users = generate_dummy_data(client, num_records)
    return users


if __name__ == "__main__":
    num_records = 10
    transaction_records = 100
    users = load_dummy_data(num_records)

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

        card_register_request = CardRegisterRequest(
            card_number=fake.pystr_format(string_format="################"),
            card_expiry=fake.credit_card_expire(),
            card_cvv=fake.credit_card_security_code(),
            wallet_id=14,
        )
        register_card(client, card_register_request)


        register_request = RegisterRequest(
            email="coles@example.com",
            password='Password1',
            phone_number=fake.phone_number(),
            account_type="merchant",
            company_name="Coles",
            ABN=fake.msisdn(),
            first_name="",
            last_name="",
        )
        register_account(client, register_request)

        register_request = RegisterRequest(
            email="woolworths@example.com",
            password='Password1',
            phone_number=fake.phone_number(),
            account_type="merchant",
            company_name="Woolworth's",
            ABN=fake.msisdn(),
            first_name="",
            last_name="",
        )
        register_account(client, register_request)

        voucher_request = VoucherRequest(
            description = "test1",
            merchant_id = 15,
            discount = 40,
        )

        add_voucher_to_merchant(client, voucher_request)

        voucher_request = VoucherRequest(
            description = "test2",
            merchant_id = 15,
            discount = 50,
        )

        add_voucher_to_merchant(client, voucher_request)

        voucher_request = VoucherRequest(
            description = "test3",
            merchant_id = 16,
            discount = 60,
        )

        add_voucher_to_merchant(client, voucher_request)

        voucher_request = VoucherRequest(
            description = "test4",
            merchant_id = 16,
            discount = 60,
        )

        add_voucher_to_merchant(client, voucher_request)

        voucher_request = VoucherRequest(
            description = "test5",
            merchant_id = 16,
            discount = 60,
        )

        add_voucher_to_merchant(client, voucher_request)

        voucher_request = VoucherRequest(
            description = "test6",
            merchant_id = 16,
            discount = 60,
        )

        add_voucher_to_merchant(client, voucher_request)


 
        add_transaction_data(client, transaction_records, users)