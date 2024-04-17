from models.merchant import Merchant
from schemas.merchant_schema import MerchantRequest
from sqlmodel import Session


def create_merchant(db: Session, merchant: MerchantRequest):
    new_merchant = Merchant(**merchant.dict())
    db.add(new_merchant)
    db.commit()
    db.refresh(new_merchant)
    return new_merchant


def get_all_merchants(db: Session):
    return db.query(Merchant).all()
