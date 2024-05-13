from typing import Annotated, List

from database import get_db_session
from fastapi import Depends
from models.account import Account
from repositories.base_repository import RepositoryBase
from sqlmodel import Session, delete, select, update


class AccountRepository(RepositoryBase[Account]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, account: Account) -> Account:
        self.session.add(account)
        self.session.commit()
        self.session.refresh(account)
        return account

    def update(self, account: Account) -> Account:
        statement = update(Account).where(Account.account_id == account.account_id).values(**account.dict())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(account)
        return account

    def delete(self, account_id: int) -> bool:
        statement = delete(Account).where(Account.account_id == account_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[Account]:
        statement = select(Account).offset(skip).limit(limit)
        accounts = self.session.exec(statement).all()
        return accounts

    def get_by_id(self, account_id: int) -> Account | None:
        statement = select(Account).where(Account.account_id == account_id)
        account = self.session.exec(statement).first()
        return account

    def get_by_email(self, email: str) -> Account | None:
        statement = select(Account).where(Account.email == email)
        account = self.session.exec(statement).first()
        return account

    def get_by_phone_number(self, phone_number: str) -> Account | None:
        statement = select(Account).where(Account.phone_number == phone_number)
        account = self.session.exec(statement).first()
        return account
