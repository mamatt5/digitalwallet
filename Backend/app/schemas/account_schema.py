from pydantic import BaseModel, EmailStr, Field
from models.account import AccountType


class AccountBase(BaseModel):
    email: EmailStr = Field(..., description="Account email")
    password: str = Field(..., description="Account password")
    phone_number: str = Field(..., description="Account phone number")
    account_type: AccountType = Field(..., description="Account type")


class AccountRequest(AccountBase):
    pass


class AccountResponse(BaseModel):
    account_id: int = Field(..., description="Account ID")
    email: EmailStr = Field(..., description="Account email")
    phone_number: str = Field(..., description="Account phone number")
    account_type: AccountType = Field(..., description="Account type")
    
    class Config:
        from_attributes = True
