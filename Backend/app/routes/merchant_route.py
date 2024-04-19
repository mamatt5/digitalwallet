from database import get_db_session
from fastapi import APIRouter, Depends
from schemas.merchant_schema import MerchantRequest, MerchantResponse
from services.merchant_service import create_merchant, get_all_merchants
from sqlmodel import Session

router = APIRouter(prefix="/merchants", tags=["Merchants"])


@router.post("/", response_model=MerchantResponse)
def create_merchant_route(merchant: MerchantRequest, db: Session = Depends(get_db_session)):
    """
    **Create Merchant Endpoint**
    - Request Body: `MerchantRequest`
    - Returns: `MerchantResponse`
    """
    return create_merchant(db, merchant)


@router.get("/", response_model=list[MerchantResponse])
def get_all_merchants_route(db: Session = Depends(get_db_session)):
    """
    **Get All Merchants Endpoint**
    - Returns: List of `MerchantResponse`
    """
    return get_all_merchants(db)
