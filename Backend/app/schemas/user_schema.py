from schemas.account_schema import AccountRequest, AccountResponse
from pydantic import BaseModel


class UserBase(BaseModel):
    first_name: str
    last_name: str


class UserRequest(UserBase, AccountRequest):
    pass


class UserResponse(UserBase, AccountResponse):
    pass
