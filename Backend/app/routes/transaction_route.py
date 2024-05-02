from fastapi import APIRouter, Depends
from models.transaction import Transaction
from services.transaction_service import TransactionService

router = APIRouter(prefix="/transactions", tags=["transaction"])


@router.post("/addtransaction")
def add_wallet_route(transaction: Transaction, transaction_service: TransactionService = Depends(TransactionService)) -> None:
    transaction_service.add_transaction(transaction)


@router.post('/gettransactions')
def get_transactions(transaction: Transaction, transaction_service: TransactionService = Depends(TransactionService)):
    return TransactionService.add_transaction(transaction)
