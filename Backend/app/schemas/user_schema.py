from pydantic import BaseModel

from schemas.account_schema import AccountRequest, AccountResponse


class UserBase(BaseModel):
    first_name: str
    last_name: str


class UserRequest(UserBase):
    account: AccountRequest


class UserResponse(UserBase):
    account: AccountResponse

    class Config:
        from_attributes = True
