from pydantic import BaseModel, ConfigDict, Field
from schemas.account_schema import AccountRequest, AccountResponse


class MerchantBase(BaseModel):
    company_name: str = Field(..., description="Merchants company name")
    ABN: str = Field(..., description="Merchants ABN")


class MerchantRequest(MerchantBase):
    account: AccountRequest = Field(..., description="Merchants account information")


class MerchantResponse(MerchantBase):
    account: AccountResponse = Field(..., description="Merchants account information")

    model_config = ConfigDict(from_attributes=True)
