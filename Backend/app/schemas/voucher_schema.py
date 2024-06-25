from pydantic import BaseModel, Field
from models.merchant import Merchant
from models.user import User


class VoucherInfo(BaseModel):
    voucher_id: int = Field(..., description="Voucher ID")
    description: str = Field(..., description="Voucher Description")
    merchant_id: int = Field(..., description="Merchant ID")
    discount: int = Field(..., description="Discount amount")

class VoucherRequest(BaseModel):
    description: str = Field(..., description="Voucher Description")
    merchant_id: int = Field(..., description="Vendor ID")
    discount: int = Field(..., description="Discount amount")
  