from fastapi import Depends
from models.loyalty_card import LoyaltyCard
from repositories.loyalty_card_repository import LoyaltyCardRepository


class LoyaltyCardService:
    def __init__(self, loyalty_card_repository: LoyaltyCardRepository = Depends(LoyaltyCardRepository)):
        self.loyalty_card_repository = loyalty_card_repository

    def add_card(self, loyalty_card: LoyaltyCard) -> None:
        loyalty_card = self.loyalty_card_repository.create(loyalty_card)

    def get_card(self, loyalty_card_id: int) -> LoyaltyCard:
        return self.loyalty_card_repository.get_by_id(loyalty_card_id)

    def get_cards(self) -> list[LoyaltyCard]:
        return self.loyalty_card_repository.get_all()

    def get_cards_from_wallet(self, wallet_id: int) -> list[LoyaltyCard]:
        return self.loyalty_card_repository.get_by_wallet(wallet_id)
