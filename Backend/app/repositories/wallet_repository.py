from typing import Annotated, List

from fastapi import Depends

from sqlmodel import Session, select, update, delete
from models.wallet import Wallet
from database import get_db_session
from repositories.base_repository import RepositoryBase

class WalletRepository(RepositoryBase[Wallet]):
    
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, wallet: Wallet) -> Wallet:
        self.session.add(wallet)
        self.session.commit()
        self.session.refresh(wallet)
        return wallet

    def update(self, wallet: Wallet) -> Wallet:
        statement = update(Wallet).where(Wallet.wallet_id == wallet.wallet_id).values(**wallet.model_dump())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(wallet)
        return wallet

    def delete(self, wallet_id: int) -> bool:
        statement = delete(Wallet).where(Wallet.wallet_id == wallet_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0
    
    def get_all(self, skip: int = 0, limit: int = 20) -> List[Wallet]:
        statement = select(Wallet).offset(skip).limit(limit)
        cards = self.session.exec(statement).all()
        return cards
    
    def get_by_id(self, wallet_id: int) -> Wallet | None:
        statement = select(Wallet).where(Wallet.wallet_id == wallet_id)
        card = self.session.exec(statement).first()
        return card