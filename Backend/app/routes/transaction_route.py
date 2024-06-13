from fastapi import APIRouter, Depends
from services.wallet_service import WalletService
from models.transaction import Transaction, Item
from services.transaction_service import TransactionService

router = APIRouter(prefix="/transactions", tags=["transaction"])

import logging

# @router.post("/addtransaction")
# def add_transaction_route(transaction: Transaction, transaction_service: TransactionService = Depends(TransactionService)) -> None:
#     transaction_service.add_transaction(transaction)

@router.post("/addtransaction")
def add_transaction_route(transaction_data: dict, transaction_service: TransactionService = Depends(TransactionService),
                          wallet_service: WalletService = Depends(WalletService)) -> None:
        
        transaction = Transaction(
             
            vendor=transaction_data['vendor'],
            date=transaction_data['date'],
            time=transaction_data['time'],
            amount=transaction_data['amount'],
            card_id=transaction_data['card_id'],
            sender=transaction_data['sender'],
            recipient=transaction_data['recipient'],
            description=transaction_data.get('description', None)
        )

        for item_data in transaction_data.get('items', []):
            item = Item(
                name=item_data['name'],
                price=item_data['price'],
                quantity=item_data['quantity']
            )

            transaction.items.append(item)

        transaction_service.add_transaction(transaction)

@router.post("/addpoints")
def add_ap_points(transaction_data: dict, wallet_service: WalletService = Depends(WalletService)) -> None:
     wallet_service.update_wallet_ap_points(transaction_data['sender'], float(transaction_data.get('amount', 0)) * 100 )

@router.get('/gettransactions')
def get_transactions(transaction: Transaction, transaction_service: TransactionService = Depends(TransactionService)):
    return TransactionService.add_transaction(transaction)

@router.get('/gettransactions/{card_id}')
def get_transaction_by_card_id(card_id: int, transaction_service: TransactionService = Depends(TransactionService)) -> list[Transaction]:
    return transaction_service.get_transaction_by_card_id(card_id)

@router.get('/gettransactions/wallet/{wallet_id}')
def get_transaction_by_wallet_id(wallet_id: int, transaction_service: TransactionService = Depends(TransactionService)) -> list[Transaction]:
    return transaction_service.get_transaction_by_wallet_id(wallet_id)

@router.get('/gettransactions/sender/{wallet_id}')
def get_transaction_by_sender(wallet_id: int, transaction_service: TransactionService = Depends(TransactionService)) -> list[Transaction]:
    return transaction_service.get_transaction_by_sender(wallet_id)

@router.get('/getitems/{transaction_id}')
def get_items_by_transaction_id(transaction_id: int, transaction_service: TransactionService = Depends(TransactionService)) -> list[Item]:
    return transaction_service.get_items_by_transaction_id(transaction_id)
