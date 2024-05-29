from typing import Annotated, List

from database import get_db_session
from fastapi import Depends
from models.loyalty_card import LoyaltyCard
from repositories.base_repository import RepositoryBase
from sqlmodel import Session, delete, select, update


class LoyaltyCardRepository(RepositoryBase[LoyaltyCard]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, loyalty_card: LoyaltyCard) -> LoyaltyCard:
        self.session.add(loyalty_card)
        self.session.commit()
        self.session.refresh(loyalty_card)
        return loyalty_card

    def update(self, loyalty_card: LoyaltyCard) -> LoyaltyCard:
        statement = (
            update(LoyaltyCard)
            .where(LoyaltyCard.card_id == loyalty_card.loyalty_card_id)
            .values(**loyalty_card.model_dump())
        )
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(loyalty_card)
        return loyalty_card

    def delete(self, loyalty_card_id: int) -> bool:
        statement = delete(LoyaltyCard).where(LoyaltyCard.loyalty_card_id == loyalty_card_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[LoyaltyCard]:
        statement = select(LoyaltyCard).offset(skip).limit(limit)
        loyalty_cards = self.session.exec(statement).all()
        return loyalty_cards

    def get_by_id(self, loyalty_card_id: int) -> LoyaltyCard | None:
        statement = select(LoyaltyCard).where(LoyaltyCard.loyalty_card_id == loyalty_card_id)
        loyalty_card = self.session.exec(statement).first()
        return loyalty_card

    def get_by_wallet(self, wallet_id: int) -> List[LoyaltyCard]:
        statement = select(LoyaltyCard).where(LoyaltyCard.wallet_id == wallet_id)
        loyalty_cards = self.session.exec(statement).all()
        return loyalty_cards
