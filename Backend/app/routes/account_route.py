from models.user import User
from models.merchant import Merchant
from models.account import Account
from services.account_service import AccountService
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/accounts", tags=["Accounts"])

@router.get("/getuser/{account_id}")
def get_user_route(account_id: int, account_service: AccountService = Depends(AccountService)) -> User:
    return account_service.get_user(account_id)

@router.get("/getmerchant/{account_id}")
def get_merchant_route(account_id: int, account_service: AccountService = Depends(AccountService)) -> Merchant:
    return account_service.get_merchant(account_id)

@router.get("/getaccount/{email}")
def get_account_with_email_route(email: str, account_service: AccountService = Depends(AccountService)) -> Account:
    return account_service.get_account_with_email(email)