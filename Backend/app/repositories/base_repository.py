from abc import ABC, abstractmethod
from typing import Any, Generic, List, TypeVar

from sqlmodel import Session

T = TypeVar("T")


class RepositoryBase(ABC, Generic[T]):
    def __init__(self, session: Session):
        self.session = session

    @abstractmethod
    def create(self, object: T) -> T:
        pass

    @abstractmethod
    def update(self, object: T) -> T:
        pass

    @abstractmethod
    def delete(self, id: Any) -> bool:
        pass

    @abstractmethod
    def get_all(self, skip: int = 0, limit: int = 20) -> List[T]:
        pass

    @abstractmethod
    def get_by_id(self, id: Any) -> T | None:
        pass
