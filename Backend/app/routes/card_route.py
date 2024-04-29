from models.card import Card
from services.card_service import CardService
from fastapi import APIRouter, Depends


router = APIRouter(prefix="/cards", tags=["Cards"])


@router.post("/addcard")
def add_card_route(card: Card, card_service: CardService = Depends(CardService)) -> None:
    card_service.add_card(card)

@router.get("/getcards")
def get_cards_route(card_service: CardService = Depends(CardService)) -> list[Card]:
    return card_service.get_cards()

@router.get("/getcard/{card_id}")
def get_card_route(card_id: int, card_service: CardService = Depends(CardService)) -> Card:
    return card_service.get_card(card_id)
