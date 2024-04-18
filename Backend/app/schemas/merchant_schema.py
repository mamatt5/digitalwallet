from schemas.account_schema import AccountRequest, AccountResponse
from pydantic import BaseModel


class MerchantBase(BaseModel):
    company_name: str
    ABN: str


class MerchantRequest(MerchantBase):
    account: AccountRequest


class MerchantResponse(MerchantBase):
    account_id: int
    account: AccountResponse

    class Config:
        from_attributes = True
