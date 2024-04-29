from fastapi import APIRouter, Depends
from models.account import Account
from security import get_current_account

router = APIRouter(prefix="/protected", tags=["Protected Routes"])


@router.get("/test")
def protected_route(current_account: Account = Depends(get_current_account)):
    return {"message": "Access granted", "account": current_account}
