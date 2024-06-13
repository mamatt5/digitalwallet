from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from models.wallet import Wallet
    from models.transaction import Transaction


class LoyaltyCard(SQLModel, table=True):
    loyalty_card_id: int | None = Field(default=None, primary_key=True)
    member_name: str
    card_number: str = Field(index=True, unique=True)
    card_expiry: str = Field(index=True)
    wallet_id: int = Field(foreign_key="wallet.wallet_id")
    wallet: Optional["Wallet"] = Relationship(back_populates="loyalty_cards")
    merchant_id: int = Field(foreign_key="merchant.account_id")
    merchant_points: int = Field(default=0)
    loyalty_transactions: list["LoyaltyTransaction"] = Relationship(back_populates='loyalty_card')


class LoyaltyTransaction(SQLModel, table=True):
    loyalty_transaction_id: int | None = Field(default=None, primary_key=True)
    loyalty_card_id: int = Field(foreign_key='loyaltycard.loyalty_card_id')
    loyalty_card: "LoyaltyCard" = Relationship(back_populates='loyalty_transactions')
    transaction_id: int = Field(foreign_key='transaction.transaction_id')
    transaction: "Transaction" = Relationship(back_populates='loyalty_transaction')
    date: str = Field(default=None)
    time: str = Field(default=None)

