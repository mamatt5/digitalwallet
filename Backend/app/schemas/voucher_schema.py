from pydantic import BaseModel, Field
from models.merchant import Merchant
from models.user import User


class VoucherInfo(BaseModel):

    voucher_desciprtion: str = Field(..., description="Voucher Description")
    vendor_id: int = Field(..., description="Vendor ID")
    user_id: int = Field(..., description="User ID")
    voucher_id: int = Field(..., description="Voucher ID")

class VoucherRequest(BaseModel):
    voucher_desciprtion: str = Field(..., description="Voucher Description")
    merchant_id: int = Field(..., description="Vendor ID")
  