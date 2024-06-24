from typing import Annotated, List
from fastapi import Depends
from sqlmodel import Session, select, update, delete
from models.vouchers import Voucher
from database import get_db_session
from repositories.base_repository import RepositoryBase


class VoucherRepository(RepositoryBase[Voucher]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, voucher: Voucher) -> Voucher:
        self.session.add(voucher)
        self.session.commit()
        self.session.refresh(voucher)
        return voucher
