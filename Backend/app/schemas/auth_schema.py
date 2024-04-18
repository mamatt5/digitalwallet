from models.account import AccountType
from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    email: EmailStr = Field(description="Account email")
    password: str = Field(description="Account password")


class RegisterRequest(BaseModel):
    email: EmailStr = Field(..., description="Account email")
    password: str = Field(..., description="Account password")
    account_type: AccountType = Field(..., description="Account type (merchant or user)")
    company_name: str = Field(None, description="Company name (required for merchant accounts)")
    ABN: str = Field(None, description="Australian Business Number (required for merchant accounts)")
    first_name: str = Field(None, description="Users first name (required for user accounts)")
    last_name: str = Field(None, description="Users last name (required for user accounts)")
    
    
class AuthResponse(BaseModel):
    message: str = Field(..., description="Authentication result message")