from typing import Annotated

from repositories.base_repository import RepositoryBase
from models.transaction import Transaction

from fastapi import Depends
from sqlmodel import Session, delete, select, update

from database import get_db_session


class TransactionRepository(RepositoryBase[Transaction]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, transaction: Transaction) -> Transaction:
        self.session.add(transaction)
        self.session.commit()
        self.session.refresh(transaction)
        return transaction

    def update(self, transaction: Transaction) -> Transaction:
        statement = update(Transaction).where(Transaction.transaction_id == Transaction.transaction_id).values(**user.dict())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(transaction)
        return transaction

    def delete(self, transaction_id: int) -> bool:
        statement = delete(Transaction).where(Transaction.transaction_id == transaction_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0
