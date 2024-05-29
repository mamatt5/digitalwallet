from typing import List

from fastapi import APIRouter, Depends
from models.loyalty_card import LoyaltyCard
from schemas.loyalty_card_schema import LoyaltyCardInfo
from services.loyalty_card_service import LoyaltyCardService

router = APIRouter(prefix="/loyaltycards", tags=["LoyaltyCards"])


@router.post("/addcard")
def add_card_route(
    loyalty_card: LoyaltyCard, loyalty_card_service: LoyaltyCardService = Depends(LoyaltyCardService)
) -> None:
    loyalty_card_service.add_card(loyalty_card)


@router.get("/getcards")
def get_cards_route(loyalty_card_service: LoyaltyCardService = Depends(LoyaltyCardService)) -> list[LoyaltyCard]:
    return loyalty_card_service.get_cards()


@router.get("/getcard/{loyalty_card_id}")
def get_card_route(
    loyalty_card_id: int, loyalty_card_service: LoyaltyCardService = Depends(LoyaltyCardService)
) -> LoyaltyCard:
    return loyalty_card_service.get_card(loyalty_card_id)


@router.get("/getcardsfromwallet/{wallet_id}", response_model=List[LoyaltyCardInfo])
def get_cards_from_wallet_route(
    wallet_id: int, loyalty_card_service: LoyaltyCardService = Depends(LoyaltyCardService)
) -> list[LoyaltyCardInfo]:
    loyalty_cards = loyalty_card_service.get_cards_from_wallet(wallet_id)
    return [
        LoyaltyCardInfo(
            card_number=loyalty_card.card_number,
            card_expiry=loyalty_card.card_expiry,
            member_name=loyalty_card.member_name,
            loyalty_card_id=loyalty_card.loyalty_card_id,
        )
        for loyalty_card in loyalty_cards
    ]
