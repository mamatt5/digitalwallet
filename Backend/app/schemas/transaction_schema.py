from sqlite3 import Date

from pydantic import BaseModel, Field

class TransactionData(BaseModel):
    transaction_id: int = Field(..., description='Transaction id')
    card_id: int = Field(..., description='Card id')
    vendor_name: str = Field(..., description='Vendor name')
    date: str = Field(..., description='Date of transaction')
    amount: int = Field(..., description='Amount of transaction')
    category_name: str = Field(..., description='Category of transaction')
    card: int = Field(..., description='id of the Card used')
    sender: int = Field(..., description='id number for the Sender')
    receiver: int = Field(..., description='id number for the Receiver')
