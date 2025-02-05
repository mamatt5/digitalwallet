from models.wallet import Wallet
from services.wallet_service import WalletService
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/wallets", tags=["Wallets"])

@router.post("/addwallet")
def add_wallet_route(wallet: Wallet, wallet_service: WalletService = Depends(WalletService)) -> None:
    wallet_service.add_wallet(wallet)


@router.get("/getwallets")
def get_wallets_route(wallet_service: WalletService = Depends(WalletService)) -> list[Wallet]:
    return wallet_service.get_wallets()


@router.get("/getwallet/{wallet_id}")
def get_wallet_route(wallet_id: int, wallet_service: WalletService = Depends(WalletService)) -> Wallet:
    return wallet_service.get_wallet(wallet_id)

@router.get("/getpoints/{wallet_id}")
def get_wallet_points(wallet_id: int, wallet_service: WalletService = Depends(WalletService)) -> float:
    return wallet_service.get_wallet_points(wallet_id)

@router.patch("/updatepoints/{wallet_id}/{points}")
def add_wallet_points(wallet_id: int, points: int, wallet_service: WalletService = Depends(WalletService)) -> None:
    return wallet_service.update_wallet_ap_points(wallet_id, points)
