from typing import Annotated, List
from fastapi import Depends
from sqlmodel import Session, select, update, delete
from models.vouchers import Voucher
from database import get_db_session
from repositories.base_repository import RepositoryBase
from models.UserVoucherLink import UserVoucherLink
import logging
logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w")


class VoucherRepository(RepositoryBase[Voucher]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, voucher: Voucher) -> Voucher:
        self.session.add(voucher)
        self.session.commit()
        self.session.refresh(voucher)
        return voucher
    
    def update(self, voucher: Voucher) -> Voucher:
        statement = update(Voucher).where(Voucher.voucher_id == voucher.voucher_id).values(**voucher.dict())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(voucher)
        return voucher

    def delete(self, voucher_id: int) -> bool:
        statement = delete(Voucher).where(Voucher.voucher_id == voucher_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[Voucher]:
        statement = select(Voucher).offset(skip).limit(limit)
        vouchers = self.session.exec(statement).all()
        return vouchers

    def get_by_id(self, voucher_id: int) -> Voucher | None:
        statement = select(Voucher).where(Voucher.voucher_id == voucher_id)
        voucher = self.session.exec(statement).first()
        return voucher
    
    def get_vouchers_for_user(self, links: list[UserVoucherLink]) ->list[Voucher]:

        final = []
        for link in links:
            statement = select(Voucher).where(Voucher.voucher_id == link.voucher_id)
            voucher = self.session.exec(statement).first()
            if voucher != None:
                final.append(voucher)

        return final
    
    def get_vouchers_for_user_and_merchants(self, links: list[UserVoucherLink], merchant_id: int) ->list[Voucher]:
        final = []
        for link in links:
            statement = select(Voucher).where(Voucher.voucher_id == link.voucher_id, Voucher.merchant_id == merchant_id)
            voucher = self.session.exec(statement).first()
            if voucher != None:
                final.append(voucher)
            
        return final
    
    
  

