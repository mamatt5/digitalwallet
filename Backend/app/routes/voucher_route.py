from typing import List
# from schemas.voucher_schema import VoucherInfo
from models.vouchers import Voucher
from services.voucher_service import VoucherService
from fastapi import APIRouter, Depends
import logging


logging.basicConfig(filename='app.log', 
                    filemode='w', 
                    format='%(asctime)s - %(levelname)s - %(message)s', 
                    level=logging.DEBUG)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/vouchers", tags=["Vouchers"])

@router.post("/addvoucher")
def add_wallet_route(voucher: Voucher, voucher_service: VoucherService = Depends(VoucherService)) -> None:
    logger.info("in add voucher")
    voucher_service.add_voucher(voucher)

