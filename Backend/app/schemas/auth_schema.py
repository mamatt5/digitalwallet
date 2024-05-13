from datetime import datetime

from models.account import AccountType
from pydantic import BaseModel, EmailStr, Field
from schemas.account_schema import AccountResponse


class Token(BaseModel):
    access_token: str = Field(..., description="Access token")
    token_type: str = Field(..., description="Token type")


class TokenData(BaseModel):
    email: EmailStr = Field(..., description="Accounts email address")
    exp: datetime = Field(..., description="Token expiration timestamp")


class RegisterRequest(BaseModel):
    email: EmailStr = Field(..., description="Account email")
    password: str = Field(..., description="Account password")
    phone_number: str = Field(..., description="Account phone number")
    account_type: AccountType = Field(..., description="Account type (merchant or user)")

    first_name: str = Field(..., description="User First Name")
    last_name: str = Field(..., description="User last Name")

    ABN: str = Field(..., description="ABN")
    company_name: str = Field(..., description="Company Name")


class AuthResponse(BaseModel):
    token: Token = Field(..., description="Access token details")
    account: AccountResponse = Field(..., description="Account details")
