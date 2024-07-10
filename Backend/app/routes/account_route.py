from models.user import User
from models.merchant import Merchant
from models.account import Account
from models.vouchers import Voucher
from services.account_service import AccountService
from fastapi import APIRouter, Depends, Request
from security import hash_password
from schemas.merchant_schema import MerchantAndVoucherInfo
router = APIRouter(prefix="/accounts", tags=["Accounts"])

<<<<<<< HEAD
router = APIRouter(prefix="/accounts", tags=["Accounts"])
=======
import logging
logging.basicConfig(level=logging.INFO, filename="py.log",filemode="w")
>>>>>>> 9d2e64eef3b23ade111904f46b9907ffd704a2c0

@router.get("/getuser/{account_id}")
def get_user_route(account_id: int, account_service: AccountService = Depends(AccountService)) -> User:
    return account_service.get_user(account_id)

@router.get("/getmerchant/{account_id}")
def get_merchant_route(account_id: int, account_service: AccountService = Depends(AccountService)) -> Merchant:
    return account_service.get_merchant(account_id)

@router.get("/getmerchants")
def get_merchant_route(account_service: AccountService = Depends(AccountService)) -> list[Merchant]:
    return account_service.get_all_merchants()

@router.get("/getaccount/{account_id}")
def get_account_route(account_id: int, account_service: AccountService = Depends(AccountService)) -> Account:
    return account_service.get_account_with_id(account_id)

@router.get("/getaccountfromemail/{email}")
def get_account_with_email_route(email: str, account_service: AccountService = Depends(AccountService)) -> bool:
    logging.info(account_service.get_account_with_email(email)) 
    return account_service.get_account_with_email(email) != None

@router.get("/getaccountfrommobile/{mobileNumber}")
def get_account_with_mobile_route(mobileNumber: str, account_service: AccountService = Depends(AccountService)) -> bool:
    return account_service.get_account_with_mobile(mobileNumber) != None

@router.patch("/updatepassword/{email}")
async def update_accout_password(email: str, request: Request, account_service: AccountService = Depends(AccountService)) -> bool:
    body = await request.json()
    return account_service.update_account_password(email, hash_password(body.get("password")))

@router.get("/getmerchantandvouchers", response_model=list[MerchantAndVoucherInfo])
def get_merchant_and_vouchers(account_service: AccountService = Depends(AccountService)):
    return account_service.get_merchant_and_vouchers()

@router.post("/addVoucher/{user_id}/{voucher_id}")
def add_voucher_to_user(user_id: int, voucher_id: int, account_service: AccountService = Depends(AccountService)) -> None:
    return account_service.add_voucher_to_user(user_id, voucher_id)




