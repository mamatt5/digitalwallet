from typing import Optional

from models.account import AccountType
from pydantic import BaseModel, EmailStr, Field
from schemas.account_schema import AccountResponse
from schemas.merchant_schema import MerchantResponse
from schemas.user_schema import UserResponse


class LoginRequest(BaseModel):
    email: EmailStr = Field(description="Account email")
    password: str = Field(description="Account password")


class RegisterRequest(BaseModel):
    email: EmailStr = Field(..., description="Account email")
    password: str = Field(..., description="Account password")
    phone_number: str = Field(..., description="Account phone number")
    account_type: AccountType = Field(..., description="Account type (merchant or user)")
    
    
class AuthResponse(BaseModel):
    account: AccountResponse = Field(..., description="The authenticated/registered account")
    merchant: Optional[MerchantResponse] = Field(None, description="The merchant information for the account (if created)")
    user: Optional[UserResponse] = Field(None, description="The user information for the account (if created)")