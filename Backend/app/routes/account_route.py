from models.user import User
from models.merchant import Merchant
from models.account import Account
from services.account_service import AccountService
from fastapi import APIRouter, Depends

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
def update_accout_password(email: str, password: str, account_service: AccountService = Depends(AccountService)) -> Account:
    
    logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w")
    logging.warning("update pass") 
    

