from faker import Faker
from fastapi import status
from fastapi.testclient import TestClient
from models.account import AccountType
from schemas.auth_schema import RegisterRequest


def test_register_route_success(client: TestClient, db_session):
    faker = Faker()
    register_data = RegisterRequest(
        email=faker.email(),
        password=faker.password(),
        phone_number=faker.phone_number(),
        account_type=AccountType.USER,
    )

    response = client.post("/auth/register", json=register_data.model_dump())

    assert response.status_code == status.HTTP_200_OK, f"Expected status 200, got {response.status_code}"

    response_json = response.json()
    assert "token" in response_json, "Response missing 'token'"
    assert "account" in response_json, "Response missing 'account'"

    assert (
        response_json["account"]["email"] == register_data.email
    ), f"Expected email {register_data.email}, got {response_json['account']['email']}"
    assert (
        response_json["account"]["phone_number"] == register_data.phone_number
    ), f"Expected phone number {register_data.phone_number}, got {response_json['account']['phone_number']}"
