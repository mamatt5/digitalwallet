from models.user import User
from models.merchant import Merchant
from models.account import Account
from repositories.user_repository import UserRepository
from repositories.merchant_repository import MerchantRepository
from repositories.account_repository import AccountRepository

from fastapi import Depends


class AccountService:

    def __init__ (self, user_repository: UserRepository = Depends(UserRepository), 
                  merchant_repository: MerchantRepository = Depends(MerchantRepository),
                  account_repository: AccountRepository = Depends(AccountRepository)):
        
        self.user_repository = user_repository
        self.merchant_repository = merchant_repository
        self.account_repository = account_repository

    def get_user(self, account_id: int) -> User:
        return self.user_repository.get_by_id(account_id)

    def get_merchant(self, account_id: int) -> Merchant:
        return self.merchant_repository.get_by_id(account_id)
    
    def get_account_with_email(self, email: str) -> Account:
        return self.account_repository.get_by_email(email)
    
    def update_account_password(self, email: str, password: str) -> Account:
        return self.account_repository.update_password(email, password)
        