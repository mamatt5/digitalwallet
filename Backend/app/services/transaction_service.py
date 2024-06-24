from fastapi import Depends
from typing import List

from models.transaction import Item, Transaction
from repositories.transaction_repository import TransactionRepository


class TransactionService:
    def __init__(self, transaction_repository: TransactionRepository = Depends(TransactionRepository)):
        self.transaction_repository = transaction_repository

    def add_transaction(self, transaction: Transaction) -> None:
        transaction = self.transaction_repository.create(transaction)

    def add_transactions(self, transactions: List[Transaction]) -> None:
        transactions = self.transaction_repository.create_all(transactions)

    def get_transaction(self, transaction_id: int) -> Transaction:
        return self.transaction_repository.get_by_id(transaction_id)

    def get_transactions(self) -> list[Transaction]:
        return self.transaction_repository.get_all()
    
    def get_transaction_by_card_id(self, card_id: int) -> list[Transaction]:
        return self.transaction_repository.get_by_card_id(card_id)
    
    def get_transaction_by_wallet_id(self, wallet_id: int) -> list[Transaction]:
        return self.transaction_repository.get_by_wallet_id(wallet_id)
    
    def get_transaction_by_sender(self, sender: int) -> list[Transaction]:
        return self.transaction_repository.get_by_sender(sender)
    
    def get_items_by_transaction_id(self, transaction_id: int) -> list[Item]:
        return self.transaction_repository.get_items_by_transaction_id(transaction_id)
    
    def check_transaction(self, transaction_ref: str) -> bool:
        return self.transaction_repository.check_transaction(transaction_ref)
