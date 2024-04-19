from pydantic import BaseModel, Field
from schemas.account_schema import AccountRequest, AccountResponse


class UserBase(BaseModel):
    first_name: str = Field(..., description="Users first name")
    last_name: str = Field(..., description="Users last name")


class UserRequest(UserBase):
    account: AccountRequest = Field(..., description="Users account information")


class UserResponse(UserBase):
    account: AccountResponse = Field(..., description="Users account information")

    class Config:
        from_attributes = True
