from fastapi import Depends

from models.transaction import Transaction
from repositories.transaction_repository import TransactionRepository


class TransactionService:
    def __init__(self, transaction_repository: TransactionRepository = Depends(TransactionRepository)):
        self.transaction_repository = transaction_repository

    def add_transaction(self, transaction: Transaction) -> None:
        transaction = self.transaction_repository.create(transaction)

    def get_transaction(self, transaction_id: int) -> Transaction:
        return self.transaction_repository.get_by_id(transaction_id)

    def get_transactions(self) -> list[Transaction]:
        return self.transaction_repository.get_all()
