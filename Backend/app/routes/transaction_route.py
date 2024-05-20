from fastapi import APIRouter, Depends
from models.transaction import Transaction
from services.transaction_service import TransactionService

router = APIRouter(prefix="/transactions", tags=["transaction"])


@router.post("/addtransaction")
def add_transaction_route(transaction: Transaction, transaction_service: TransactionService = Depends(TransactionService)) -> None:
    transaction_service.add_transaction(transaction)


@router.get('/gettransactions')
def get_transactions(transaction: Transaction, transaction_service: TransactionService = Depends(TransactionService)):
    return TransactionService.add_transaction(transaction)

@router.get('/gettransactions/{card_id}')
def get_transaction_by_card_id(card_id: int, transaction_service: TransactionService = Depends(TransactionService)) -> list[Transaction]:
    return transaction_service.get_transaction_by_card_id(card_id)
