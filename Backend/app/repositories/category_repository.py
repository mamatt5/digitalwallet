from typing import Annotated, List
from fastapi import Depends
from sqlmodel import Session, select, update, delete
from models.category import Category
from database import get_db_session
from repositories.base_repository import RepositoryBase


class CategoryRepository(RepositoryBase[Category]):

    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, category: Category) -> Category:
        self.session.add(category)
        self.session.commit()
        self.session.refresh(category)
        return category

    def update(self, category: Category) -> Category:
        statement = update(Category).where(Category.category_id == category.category_id).values(**category.model_dump())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(category)
        return category

    def delete(self, category_id: int) -> bool:
        statement = delete(Category).where(Category.category_id == category_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[Category]:
        statement = select(Category).offset(skip).limit(limit)
        categorys = self.session.exec(statement).all()
        return categorys

    def get_by_id(self, category_id: int) -> Category | None:
        statement = select(Category).where(Category.category_id == category_id)
        category = self.session.exec(statement).first()
        return category