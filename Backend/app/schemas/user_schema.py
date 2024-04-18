from schemas.account_schema import AccountRequest, AccountResponse
from pydantic import BaseModel


class UserBase(BaseModel):
    first_name: str
    last_name: str


class UserRequest(UserBase):
    account: AccountRequest


class UserResponse(UserBase):
    account_id: int
    account: AccountResponse

    class Config:
        from_attributes = True
