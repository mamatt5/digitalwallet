from fastapi import Depends

from models.transaction import Transaction
from repositories.transaction_repository import TransactionRepository


class TransactionService:
    def __init__(self, transaction_repository: TransactionRepository = Depends(TransactionRepository)):
        self.transaction_repository = transaction_repository

    def add_transaction(self, transaction: Transaction) -> None:
        print(transaction)
        transaction = self.transaction_repository.create(transaction)

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
