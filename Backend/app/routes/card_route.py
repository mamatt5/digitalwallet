from typing import List
from schemas.card_schema import CardInfo
from models.card import Card
from services.card_service import CardService
from fastapi import APIRouter, Depends

import logging
router = APIRouter(prefix="/cards", tags=["Cards"])

logging.basicConfig(filename='app.log', 
                    filemode='w', 
                    format='%(asctime)s - %(levelname)s - %(message)s', 
                    level=logging.DEBUG)

logger = logging.getLogger(__name__)


@router.post("/addcard")
def add_card_route(card: Card, card_service: CardService = Depends(CardService)) -> None:
    logger.info("in add card")
    card_service.add_card(card)


@router.get("/getcards")
def get_cards_route(card_service: CardService = Depends(CardService)) -> list[Card]:
    return card_service.get_cards()


@router.get("/getcard/{card_id}")
def get_card_route(card_id: int, card_service: CardService = Depends(CardService)) -> CardInfo:
    return card_service.get_card(card_id)

@router.delete("/deletecard/{card_id}")
def delete_card_route(card_id: int, card_service: CardService = Depends(CardService)) -> None:
    card_service.delete_card(card_id)


@router.get("/getcardsfromwallet/{wallet_id}", response_model=List[CardInfo])
def get_cards_from_wallet_route(wallet_id: int, card_service: CardService = Depends(CardService)) -> list[CardInfo]:
    cards = card_service.get_cards_from_wallet(wallet_id)
    return [CardInfo(card_number=card.card_number, card_expiry=card.card_expiry, card_id=card.card_id) for card in cards]
