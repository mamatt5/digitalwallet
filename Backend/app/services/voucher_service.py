from models.vouchers import Voucher
from repositories.voucher_repositoary import VoucherRepository
from fastapi import Depends


class VoucherService:

    def __init__(self, voucher_repositoary: VoucherRepository = Depends(VoucherRepository)):
        self.voucher_repositoary = voucher_repositoary

    def add_voucher(self, voucher: Voucher) -> None:
        voucher = self.voucher_repositoary.create(voucher)