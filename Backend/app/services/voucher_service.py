from models.vouchers import Voucher
from repositories.voucher_repositoary import VoucherRepository
from fastapi import Depends

class VoucherService:

    def __init__(self, voucher_repositoary: VoucherRepository = Depends(VoucherRepository)):
        self.voucher_repositoary = voucher_repositoary

    def add_voucher(self, voucher: Voucher) -> None:
        voucher = self.voucher_repositoary.create(voucher)

    def get_voucher(self, voucher_id: int) -> Voucher:
        return self.voucher_repositoary.get_by_id(voucher_id)
    
    def get_vouchers(self) -> list[Voucher]:
        return self.voucher_repositoary.get_all()
    
    def delete_voucher(self, voucher_id: int) -> None:
        self.voucher_repositoary.delete(voucher_id)

    def get_vouchers_for_merchant(self, merchant_id: int) -> list[Voucher]:
        return self.voucher_repositoary.get_voucher_for_merchant(merchant_id)