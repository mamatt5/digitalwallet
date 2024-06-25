from pydantic import BaseModel, Field
from sqlmodel import LargeBinary

class QRImageData(BaseModel):
    qr_image_id: int = Field(..., description='QR image id')
    name: str = Field(..., description='Image name')
    data: LargeBinary = Field(..., description="Image data")
    merchant_id: int = Field(..., description='Merchant id')