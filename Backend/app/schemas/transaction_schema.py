from sqlite3 import Date

from pydantic import BaseModel, Field

from models.card import Card
from models.merchant import Merchant
from models.wallet import Wallet


class TransactionData(BaseModel):
    transaction_id: int = Field(..., description='Transaction id')
    card_id: int = Field(..., description='Card id')
    vendor: Merchant = Field(..., description='Vendor name')
    date: str = Field(..., description='Date of transaction')
    amount: int = Field(..., description='Amount of transaction')
    category_name: str = Field(..., description='Category of transaction')
    card: Card = Field(..., description='id of the Card used')
    sender: Wallet = Field(..., description='id number for the Sender')
    receiver: Wallet = Field(..., description='id number for the Receiver')
