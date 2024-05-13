from models.wallet import Wallet
from repositories.wallet_repository import WalletRepository
from fastapi import Depends


class WalletService:

    def __init__(self, wallet_repository: WalletRepository = Depends(WalletRepository)):
        self.wallet_repository = wallet_repository

    def add_wallet(self, wallet: Wallet) -> None:
        wallet = self.wallet_repository.create(wallet)

    def get_wallet(self, wallet_id: int) -> Wallet:
        return self.wallet_repository.get_by_id(wallet_id)

    def get_wallets(self) -> list[Wallet]:
        return self.wallet_repository.get_all()
