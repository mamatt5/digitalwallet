from typing import Optional

from models.account import AccountType
from pydantic import BaseModel, EmailStr, Field
from schemas.account_schema import AccountResponse
from schemas.merchant_schema import MerchantResponse
from schemas.user_schema import UserResponse

class Token(BaseModel):
    access_token: str = Field(..., description="Access token")
    token_type: str = Field(..., description="Token type")
    expires_in: int = Field(..., description="Expiration time of the access token in seconds")
    refresh_token: str = Field(..., description="Refresh token")

class LoginRequest(BaseModel):
    email: EmailStr = Field(description="Account email")
    password: str = Field(description="Account password")


class RegisterRequest(BaseModel):
    email: EmailStr = Field(..., description="Account email")
    password: str = Field(..., description="Account password")
    phone_number: str = Field(..., description="Account phone number")
    account_type: AccountType = Field(..., description="Account type (merchant or user)")
    
    
class AuthResponse(BaseModel):
    token: Token = Field(..., description="Access token details")