from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel, LargeBinary
from pydantic import ConfigDict

if TYPE_CHECKING:
    from models.merchant import Merchant

class QRImage(SQLModel, table=True):
    
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    qrimage_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    data: LargeBinary = Field(sa_type=LargeBinary)
    merchant_id: Optional[int] = Field(default=None, foreign_key="merchant.account_id")
    merchant: "Merchant" = Relationship(back_populates="qr_image")