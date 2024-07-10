from sqlite3 import Date

from pydantic import BaseModel, ConfigDict, Field

class ItemData(BaseModel):
    item_id: int = Field(..., description='Item id')
    transaction_id: int = Field(..., description='Transaction id')
    name: str = Field(..., description='Name of the item')
    price: str = Field(..., description='Price of the item')
    quantity: int = Field(..., description='Quantity of the item')

class TransactionData(BaseModel):
    transaction_id: int = Field(..., description='Transaction id')
    card_id: int = Field(..., description='Card id')
    vendor: int = Field(..., description='Vendor account id')
    date: str = Field(..., description='Date of transaction')
    amount: str = Field(..., description='Amount of transaction')
    # category_name: str = Field(..., description='Category of transaction')
    sender: int = Field(..., description='id number for the Sender')
    recipient: int = Field(..., description='id number for the Receiver')

class TransactionResponse(TransactionData):
    transaction_id: int = Field(..., description='Transaction id')
    card_id: int = Field(..., description='Card id')
    vendor: int = Field(..., description='Vendor account id')
    date: str = Field(..., description='Date of transaction')
    amount: str = Field(..., description='Amount of transaction')
    # category_name: str = Field(..., description='Category of transaction')
    sender: int = Field(..., description='id number for the Sender')
    recipient: int = Field(..., description='id number for the Receiver')
    items: list[ItemData] = Field(..., description='List of items in the transaction')

    model_config=ConfigDict(from_attributes=True)