from models.card import Card
from repositories.card_repository import CardRepository
from fastapi import Depends

class CardService:

    def __init__(self, card_repository: CardRepository = Depends(CardRepository)):
        self.card_repository = card_repository

    def add_card(self, card: Card) -> None:
        card = self.card_repository.create(card)

    def get_card(self, card_id: int) -> Card:
        return self.card_repository.get(card_id)
    
    def get_cards(self) -> list[Card]:
        return self.card_repository.get_all()
    
    def get_cards_from_wallet(self, wallet_id: int) -> list[Card]:
        return self.card_repository.get_by_wallet(wallet_id)