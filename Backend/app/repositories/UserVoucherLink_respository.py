from typing import Annotated, List
from fastapi import Depends
from sqlmodel import Session, select, update, delete
from models.vouchers import Voucher
from database import get_db_session
from repositories.base_repository import RepositoryBase
from models.UserVoucherLink import UserVoucherLink


class UserVoucherLinkRepository(RepositoryBase[UserVoucherLink]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    # crud functions here are needed as the repo require the crud functions to exist
    # however these are the crud functions for vouchers lmao
    # doesnt rlly matter since im ever using thise crud functions
    # but change to UserVOucherLInk related (change voucher to uservoucher link)
    # will do later as im priortising functionality
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

    def delete(self, voucher_id: int, user_id: int) -> bool:
        statement = delete(UserVoucherLink).where(UserVoucherLink.voucher_id == voucher_id, UserVoucherLink.user_id == user_id)
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


    def get_links_by_user_id(self, user_id: int) ->list[UserVoucherLink]:
        statement = select(UserVoucherLink).where(UserVoucherLink.user_id == user_id)
        links = self.session.exec(statement).all()
        return links
    
    # def get_links_by_user_id_and_merchant_id(self, merchant_id: int, user_id: int) -> list[UserVoucherLink]:
    #     statement = select(UserVoucherLink).where( UserVoucherLink.user_id == user_id)
    #     links = self.session.exec(statement).all()
    #     return links