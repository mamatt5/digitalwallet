from pydantic import BaseModel, EmailStr


class AccountRequest(BaseModel):
    email: EmailStr
    password: str


class AccountResponse(BaseModel):
    account_id: int
    email: EmailStr

    class Config:
        orm_mode = True
