from pydantic import BaseModel, EmailStr

class AccountBase(BaseModel):
    email: EmailStr
    password: str
    account_type: str

class AccountRequest(AccountBase):
    pass

class AccountResponse(BaseModel):
    account_id: int

    class Config:
        from_attributes = True
