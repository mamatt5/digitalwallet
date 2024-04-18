from models.account import Account, AccountType
from models.merchant import Merchant
from schemas.merchant_schema import MerchantRequest
from sqlmodel import Session


def create_merchant(db: Session, merchant: MerchantRequest):
    account_data = merchant.account.dict()
    account_data["account_type"] = AccountType.MERCHANT
    account = Account(**account_data)
    db.add(account)
    db.commit()
    db.refresh(account)

    new_merchant = Merchant(**merchant.dict(exclude={"account"}), account=account)
    db.add(new_merchant)
    db.commit()
    db.refresh(new_merchant)
    return new_merchant


def get_all_merchants(db: Session):
    return db.query(Merchant).all()
