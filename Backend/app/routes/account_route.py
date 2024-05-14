from models.user import User
from models.merchant import Merchant
from models.account import Account
from services.account_service import AccountService
from fastapi import APIRouter, Depends, Request
from security import hash_password

import logging

router = APIRouter(prefix="/accounts", tags=["Accounts"])


@router.get("/getuser/{account_id}")
def get_user_route(account_id: int, account_service: AccountService = Depends(AccountService)) -> User:
    return account_service.get_user(account_id)


@router.get("/getmerchant/{account_id}")
def get_merchant_route(account_id: int, account_service: AccountService = Depends(AccountService)) -> Merchant:
    return account_service.get_merchant(account_id)

@router.get("/getaccount/{email}")
def get_account_with_email_route(email: str, account_service: AccountService = Depends(AccountService)) -> bool:
    return account_service.get_account_with_email(email) != None

@router.patch("/updatepassword/{email}")
async def update_accout_password(email: str, request: Request, account_service: AccountService = Depends(AccountService)) -> bool:
    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w")
    logging.warning("update pass6")
    body = await request.json()
    logging.warning(body.get("password")) 
    return account_service.update_account_password(email, hash_password(body.get("password")))

