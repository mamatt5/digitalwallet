from typing import Annotated, List

from database import get_db_session
from fastapi import Depends
from models.merchant import Merchant
from models.vouchers import Voucher
from repositories.base_repository import RepositoryBase
from sqlmodel import Session, delete, select, update


class MerchantRepository(RepositoryBase[Merchant]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, merchant: Merchant) -> Merchant:
        self.session.add(merchant)
        self.session.commit()
        self.session.refresh(merchant)
        return merchant

    def update(self, merchant: Merchant) -> Merchant:
        statement = update(Merchant).where(Merchant.account_id == merchant.account_id).values(**merchant.model_dump())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(merchant)
        return merchant

    def delete(self, account_id: int) -> bool:
        statement = delete(Merchant).where(Merchant.account_id == account_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[Merchant]:
        statement = select(Merchant).offset(skip).limit(limit)
        merchants = self.session.exec(statement).all()
        return merchants

    def get_by_id(self, account_id: int) -> Merchant | None:
        statement = select(Merchant).where(Merchant.account_id == account_id)
        merchant = self.session.exec(statement).first()
        return merchant
    

    def get_merchant_and_vouchers(self) -> list[dict]:
        statement = select(Merchant)
        merchants = self.session.exec(statement).all()
        merchantsWithVouchers = []
       
        for merchant in merchants:
            vouchers_query = select(Voucher).where(Voucher.merchant_id == merchant.account_id)
            vouchers = self.session.exec(vouchers_query).all()
            
            data = {
                "company_id": merchant.account_id,
                "company_name": merchant.company_name,
                "ABN": merchant.ABN,
                "vouchers": vouchers
            }
            merchantsWithVouchers.append(data)
            
        return merchantsWithVouchers
            


