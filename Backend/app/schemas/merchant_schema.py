from pydantic import BaseModel

from schemas.account_schema import AccountRequest, AccountResponse


class MerchantBase(BaseModel):
    company_name: str
    ABN: str


class MerchantRequest(MerchantBase):
    account: AccountRequest


class MerchantResponse(MerchantBase):
    account: AccountResponse

    class Config:
        from_attributes = True
