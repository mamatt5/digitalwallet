from pydantic import BaseModel, EmailStr
from models.account import AccountType

class AccountBase(BaseModel):
    email: EmailStr
    password: str

class AccountRequest(AccountBase):
    pass

class AccountResponse(BaseModel):
    account_id: int

    class Config:
        from_attributes = True
