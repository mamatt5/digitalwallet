from models.user import User
from models.merchant import Merchant
from repositories.user_repository import UserRepository
from repositories.merchant_repository import MerchantRepository

from fastapi import Depends

class AccountService:

    def __init__ (self, user_repository: UserRepository = Depends(UserRepository), merchant_repository: MerchantRepository = Depends(MerchantRepository)):
        self.user_repository = user_repository
        self.merchant_repository = merchant_repository

    def get_user(self, account_id: int) -> User:
        return self.user_repository.get_by_id(account_id)
    
    def get_merchant(self, account_id: int) -> Merchant:
        return self.merchant_repository.get_by_id(account_id)