from pydantic import BaseModel, EmailStr, Field


class AccountBase(BaseModel):
    email: EmailStr = Field(..., description="Account email")
    password: str = Field(..., description="Account password")


class AccountRequest(AccountBase):
    pass


class AccountResponse(BaseModel):
    account_id: int = Field(..., description="Account ID")

    class Config:
        from_attributes = True
