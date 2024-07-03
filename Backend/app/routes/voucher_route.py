from typing import List
from schemas.voucher_schema import VoucherInfo
from models.vouchers import Voucher
from services.voucher_service import VoucherService
from fastapi import APIRouter, Depends
import logging
logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w")

router = APIRouter(prefix="/vouchers", tags=["Vouchers"])

@router.post("/addvoucher")
def add_wallet_route(voucher: Voucher, voucher_service: VoucherService = Depends(VoucherService)) -> None:
    voucher_service.add_voucher(voucher)

@router.get("/getvouchers")
def get_vouchers_route(voucher_service: VoucherService = Depends(VoucherService)) -> list[Voucher]:
    return voucher_service.get_vouchers()

@router.get("/getvoucher/{voucher_id}")
def get_voucher_route(voucher_id: int, voucher_service = Depends(VoucherService)) -> VoucherInfo:
    return voucher_service.get_voucher(voucher_id)

@router.delete("/deletevoucher/{voucher_id}")
def delete_voucher_route(voucher_id: int, voucher_service: VoucherService = Depends(VoucherService)) -> None:
    voucher_service.delete_voucher(voucher_id)


@router.get("/getvouchersforuser/{user_id}")
def get_vouchers_route(user_id: int, voucher_service: VoucherService = Depends(VoucherService)) -> list[Voucher]:
    return voucher_service.get_vouchers_for_user(user_id)

@router.delete("/deletevoucherforuser/{voucher_id}/{user_id}")
def delete_voucher_for_user(voucher_id: int, user_id: int, voucher_service: VoucherService = Depends(VoucherService)) -> bool:
    return voucher_service.delete_voucher_for_user(voucher_id, user_id)

@router.get("/getvouchersforuser/{user_id}")
def get_vouchers_route(user_id: int, voucher_service: VoucherService = Depends(VoucherService)) -> list[Voucher]:
    return voucher_service.get_vouchers_for_user(user_id)


@router.get("/getvouchersforuserandmerchant/{merchant_id}/{user_id}")
def get_vouchers_route_for_user_and_merchant(merchant_id:int, user_id: int, voucher_service: VoucherService = Depends(VoucherService)) -> list[Voucher]:
    return voucher_service.get_vouchers_for_user_and_merchant(merchant_id, user_id)

