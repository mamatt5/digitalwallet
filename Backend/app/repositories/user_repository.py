from typing import Annotated, List

from database import get_db_session
from fastapi import Depends
from models.user import User
from repositories.base_repository import RepositoryBase
from sqlmodel import Session, delete, select, update


class UserRepository(RepositoryBase[User]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, user: User) -> User:
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user

    def update(self, user: User) -> User:
        statement = update(User).where(User.account_id == user.account_id).values(**user.dict())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(user)
        return user

    def delete(self, account_id: int) -> bool:
        statement = delete(User).where(User.account_id == account_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[User]:
        statement = select(User).offset(skip).limit(limit)
        users = self.session.exec(statement).all()
        return users

    def get_by_id(self, account_id: int) -> User | None:
        statement = select(User).where(User.account_id == account_id)
        user = self.session.exec(statement).first()
        return user
