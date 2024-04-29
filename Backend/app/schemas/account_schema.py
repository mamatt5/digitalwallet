from models.account import AccountType
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AccountBase(BaseModel):
    email: EmailStr = Field(..., description="Account email")
    password: str = Field(..., description="Account password")
    phone_number: str = Field(..., description="Account phone number")
    account_type: AccountType = Field(..., description="Account type (merchant or user)")


class AccountRequest(AccountBase):
    pass


class AccountResponse(AccountBase):
    account_id: int = Field(..., description="Account ID")
    email: EmailStr = Field(..., description="Account email")
    phone_number: str = Field(..., description="Account phone number")
    account_type: AccountType = Field(..., description="Account type")

    model_config = ConfigDict(from_attributes=True)
