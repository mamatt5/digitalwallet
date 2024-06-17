from typing import Annotated, List
from fastapi import Depends
from sqlmodel import Session, select, update, delete
from models.card import Card
from database import get_db_session
from repositories.base_repository import RepositoryBase


class CardRepository(RepositoryBase[Card]):

    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, card: Card) -> Card:
        self.session.add(card)
        self.session.commit()
        self.session.refresh(card)
        return card

    def update(self, card: Card) -> Card:
        statement = update(Card).where(Card.card_id == card.card_id).values(**card.model_dump())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(card)
        return card

    def delete(self, card_id: int) -> bool:
        statement = delete(Card).where(Card.card_id == card_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[Card]:
        statement = select(Card).offset(skip).limit(limit)
        cards = self.session.exec(statement).all()
        return cards

    def get_by_id(self, card_id: int) -> Card | None:
        statement = select(Card).where(Card.card_id == card_id)
        card = self.session.exec(statement).first()
        return card

    def get_by_wallet(self, wallet_id: int) -> List[Card]:
        statement = select(Card).where(Card.wallet_id == wallet_id)
        cards = self.session.exec(statement).all()
        return cards
