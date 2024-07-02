import logging
import random
from typing import Dict, List
from datetime import datetime, timedelta

from faker import Faker
from fastapi import status
from fastapi.testclient import TestClient
from main import app
from models.account import AccountType
from schemas.auth_schema import AuthResponse, RegisterRequest
from schemas.card_schema import CardRegisterRequest

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
            category_id=1,
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
            category_id=1,
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


def add_transaction_data(client, users: List[int], items: List) -> None:
    transactions = list()
    for _ in range(100):
        transactions.append(create_transaction_data(users, items))
    response = client.post("/transactions/addtransactions", json=transactions)
    assert response.status_code == status.HTTP_200_OK, f"Transactions add failed: {response.text}"
    logger.info(f"Transactions added successfully")
    

def create_transaction_data(users: List[int], items: List) -> Dict:
    logger.info("Creating transaction data")
    randomDatetime = fake.date_time_this_year(before_now=True)
    num_items = random.randint(1, 3)
    bought_items = random.choices(population=items, k=num_items)
    total = 0
    for item in bought_items:
        total += float(item["price"])
    customer = random.choice(users)
    return {
        "vendor": 13,
        "date": randomDatetime.strftime("%x"),
        "time": randomDatetime.strftime("%X"),
        "amount": str(total),
        "description": "Test transaction",
        "card_id": customer,
        "sender": customer,
        "recipient": 13,
        "items": bought_items,
    }

def create_items() -> List:
    latte = {
        "name": "Latte",
        "price": "5",
        "quantity": "1"
    }
    
    flat_white = {
        "name": "Flat White",
        "price": "5",
        "quantity": "1"
    }
    
    cappuccino = {
        "name": "Cappuccino",
        "price": "5",
        "quantity": "1"
    }
    
    long_black = {
        "name": "Long Black",
        "price": "4",
        "quantity": "1"
    }
    
    espresso = {
        "name": "Espresso",
        "price": "3",
        "quantity": "1"
    }
    
    mocha = {
        "name": "Mocha",
        "price": "5",
        "quantity": "1"
    }
    
    muffin = {
        "name": "Muffin",
        "price": "5.50",
        "quantity": "1"
    }
    
    cookie = {
        "name": "Cookie",
        "price": "4.75",
        "quantity": "1"
    }
    
    brownie = {
        "name": "Brownie",
        "price": "6",
        "quantity": "1"
    }
    
    glazed_donut = {
        "name": "Glazed Donut",
        "price": "4",
        "quantity": "1"
    }
    
    chocolate_donut = {
        "name": "Chocolate Donut",
        "price": "4.50",
        "quantity": "1"
    }
    
    avocado_toast = {
        "name": "Avocado Toast",
        "price": "10",
        "quantity": "1"
    }
    
    eggs_benedict = {
        "name": "Eggs Benedict",
        "price": "15",
        "quantity": "1"
    }

    pancakes = {
        "name": "Pancakes",
        "price": "12",
        "quantity": "1"
    }

    breakfast_bowl = {
        "name": "Breakfast Bowl",
        "price": "14",
        "quantity": "1"
    }

    smashed_peas = {
        "name": "Smashed Peas",
        "price": "11",
        "quantity": "1"
    }

    big_breakfast = {
        "name": "Big Breakfast",
        "price": "18",
        "quantity": "1"
    }

    sandwich = {
        "name": "Sandwich",
        "price": "8",
        "quantity": "1"
    }

    salad = {
        "name": "Salad",
        "price": "12",
        "quantity": "1"
    }

    burger = {
        "name": "Burger",
        "price": "15",
        "quantity": "1"
    }

    fish_and_chips = {
        "name": "Fish and Chips",
        "price": "17",
        "quantity": "1"
    }

    pie = {
        "name": "Pie",
        "price": "6",
        "quantity": "1"
    }

    sausage_roll = {
        "name": "Sausage Roll",
        "price": "5",
        "quantity": "1"
    }

    quiche = {
        "name": "Quiche",
        "price": "7",
        "quantity": "1"
    }

    soup = {
        "name": "Soup of the Day",
        "price": "10",
        "quantity": "1"
    }

    arancini = {
        "name": "Arancini Balls",
        "price": "9",
        "quantity": "1"
    }

    bruschetta = {
        "name": "Bruschetta",
        "price": "8",
        "quantity": "1"
    }

    scones = {
        "name": "Scones",
        "price": "5",
        "quantity": "1"
    }

    cake = {
        "name": "Cake",
        "price": "7",
        "quantity": "1"
    }

    pastry = {
        "name": "Pastry",
        "price": "4",
        "quantity": "1"
    }

    tea = {
        "name": "Tea",
        "price": "4",
        "quantity": "1"
    }

    smoothie = {
        "name": "Smoothie",
        "price": "8",
        "quantity": "1"
    }

    milkshake = {
        "name": "Milkshake",
        "price": "7",
        "quantity": "1"
    }

    vegetarian_burger = {
        "name": "Vegetarian Burger",
        "price": "15",
        "quantity": "1"
    }

    vegan_bowl = {
        "name": "Vegan Bowl",
        "price": "14",
        "quantity": "1"
    }

    gluten_free_cake = {
        "name": "Gluten-Free Cake",
        "price": "7",
        "quantity": "1"
    }

    dumplings = {
        "name": "Dumplings",
        "price": "10",
        "quantity": "1"
    }

    falafel = {
        "name": "Falafel",
        "price": "9",
        "quantity": "1"
    }

    mezze_platter = {
        "name": "Mezze Platter",
        "price": "18",
        "quantity": "1"
    }
    
    return [latte, flat_white, cappuccino, long_black, espresso, mocha, tea,
            muffin, cookie, glazed_donut, chocolate_donut, brownie, avocado_toast,
            eggs_benedict, breakfast_bowl, pancakes, smashed_peas,
            big_breakfast, sandwich, salad, burger, fish_and_chips,
            pie, sausage_roll, quiche, soup, arancini, bruschetta, scones,
            cake, pastry, smoothie, milkshake, vegan_bowl, vegetarian_burger,
            gluten_free_cake, dumplings, falafel, mezze_platter]
    

def add_categories(client) -> None:
    response = client.post("/categories/addcategory", json={"category_name": "food"})
    assert response.status_code == status.HTTP_200_OK, f"Transactions add failed: {response.text}"
    response = client.post("/categories/addcategory", json={"category_name": "shopping"})
    assert response.status_code == status.HTTP_200_OK, f"Transactions add failed: {response.text}"
    response = client.post("/categories/addcategory", json={"category_name": "entertainment"})
    assert response.status_code == status.HTTP_200_OK, f"Transactions add failed: {response.text}"
    response = client.post("/categories/addcategory", json={"category_name": "transportation"})
    assert response.status_code == status.HTTP_200_OK, f"Transactions add failed: {response.text}"
    logger.info(f"Categories added successfully")


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
    users = load_dummy_data(num_records)
    items = create_items()

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
            category_id=1,
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
            category_id=1,
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
            category_id=1,
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
            category_id=1,
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
            category_id=1,
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
            category_id=1,
        )
        register_account(client, register_request)

        add_transaction_data(client, users, items)
        
        add_categories(client)