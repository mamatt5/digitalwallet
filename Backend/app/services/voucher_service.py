from models.vouchers import Voucher
from repositories.voucher_repositoary import VoucherRepository
from repositories.UserVoucherLink_respository import UserVoucherLinkRepository
from fastapi import Depends

import logging
logging.basicConfig(level=logging.INFO, filename="py_log.log",filemode="w")
class VoucherService:

    def __init__(self, voucher_repository: VoucherRepository = Depends(VoucherRepository), UserVoucherLink_Repository: UserVoucherLinkRepository = Depends(UserVoucherLinkRepository)):
        self.voucher_repository = voucher_repository
        self.userVoucherLink_Repository = UserVoucherLink_Repository

    def add_voucher(self, voucher: Voucher) -> None:
        voucher = self.voucher_repository.create(voucher)

    def get_voucher(self, voucher_id: int) -> Voucher:
        return self.voucher_repository.get_by_id(voucher_id)
    
    def get_vouchers(self) -> list[Voucher]:
        return self.voucher_repository.get_all()
    
    def delete_voucher(self, voucher_id: int) -> None:
        self.voucher_repository.delete(voucher_id)

    def get_vouchers_for_user(self, user_id: int) -> list[Voucher]:
        links = self.userVoucherLink_Repository.get_links_by_user_id(user_id)
        return self.voucher_repository.get_vouchers_for_user(links)
    
    def get_vouchers_for_user_and_merchant(self, merchant_id: int, user_id: int) -> list[Voucher]:
        links = self.userVoucherLink_Repository.get_links_by_user_id(user_id)
        return self.voucher_repository.get_vouchers_for_user_and_merchants(links, merchant_id)

    def delete_voucher_for_user(self, voucher_id: int, user_id: int) -> bool:
        return self.userVoucherLink_Repository.delete(voucher_id, user_id)
    
