from typing import Annotated, List, Any
from repositories.base_repository import RepositoryBase, T
from models.transaction import Item, Transaction
from models.loyalty_card import LoyaltyTransaction

from fastapi import Depends
from sqlmodel import Session, delete, or_, select, update
from database import get_db_session


class TransactionRepository(RepositoryBase[Transaction]):

    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, transaction: Transaction) -> Transaction:
        self.session.add(transaction)
        self.session.commit()
        self.session.refresh(transaction)
        return transaction
    
    def create_all(self, transactions: List[Transaction]) -> List[Transaction]:
        self.session.add_all(transactions)
        self.session.commit()
        for transaction in transactions:
            self.session.refresh(transaction)
        return transactions
    
    def create_loyalty_transaction(self, loyalty_transaction: LoyaltyTransaction) -> LoyaltyTransaction:
        self.session.add(loyalty_transaction)
        self.session.commit()
        self.session.refresh(loyalty_transaction)
        return loyalty_transaction

    def update(self, transaction: Transaction) -> Transaction:
        statement = update(Transaction).where(Transaction.transaction_id == Transaction.transaction_id).values(
            **transaction.dict())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(transaction)
        return transaction

    def delete(self, transaction_id: int) -> bool:
        statement = delete(Transaction).where(Transaction.transaction_id == transaction_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_by_id(self, transaction_id: Any) -> Transaction | None:
        statement = select(Transaction).where(Transaction.transaction_id == transaction_id)
        transaction = self.session.exec(statement).first()
        return transaction

    def get_all(self, skip: int = 0, limit: int = 20) -> List[Transaction]:
        statement = select(Transaction).offset(skip).limit(limit)
        transactions = self.session.exec(statement).all()
        return transactions
    
    def get_by_card_id(self, card_id: int) -> List[Transaction]:
        statement = select(Transaction).where(Transaction.card_id == card_id)
        transactions = self.session.exec(statement).all()
        return transactions
    
    def get_by_wallet_id(self, wallet_id: int) -> List[Transaction]:
        statement = select(Transaction).where(or_(Transaction.sender == wallet_id, Transaction.recipient == wallet_id))
        transactions = self.session.exec(statement).all()
        return transactions
    
    def get_by_sender(self, wallet_id: int) -> List[Transaction]:
        statement = select(Transaction).join(Item, Transaction.transaction_id == Item.transaction_id).where(Transaction.sender == wallet_id).distinct()
        transactions = self.session.exec(statement).all()
        return transactions
    
    def get_items_by_transaction_id(self, transaction_id: int) -> List[Item]:
        statement = select(Item).where(Item.transaction_id == transaction_id)
        items = self.session.exec(statement).all()
        return items
    
    def check_transaction(self, transaction_ref: str) -> bool:
        statement = select(Transaction).where(Transaction.transaction_ref == transaction_ref)
        transaction = self.session.exec(statement).first()
        return transaction is not None
