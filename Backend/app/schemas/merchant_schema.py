from schemas.account_schema import AccountRequest, AccountResponse
from pydantic import BaseModel


class MerchantBase(BaseModel):
    company_name: str
    ABN: str


class MerchantRequest(MerchantBase, AccountRequest):
    pass


class MerchantResponse(MerchantBase, AccountResponse):
    pass
