from fastapi import HTTPException
from models.account import Account, AccountType
from models.merchant import Merchant
from models.user import User
from passlib.context import CryptContext
from schemas.auth_schema import AuthResponse, LoginRequest, RegisterRequest
from sqlmodel import Session

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)


def hash_password(password):
    return password_context.hash(password)


def login(db: Session, login_request: LoginRequest):
    account = db.query(Account).filter(Account.email == login_request.email).first()
    if not account or not verify_password(login_request.password, account.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    response_data = {"account": account}
    if account.account_type == AccountType.MERCHANT:
        merchant = db.query(Merchant).filter(Merchant.account_id == account.account_id).first()
        if merchant:
            response_data["merchant"] = merchant
    elif account.account_type == AccountType.USER:
        user = db.query(User).filter(User.account_id == account.account_id).first()
        if user:
            response_data["user"] = user
        
    return AuthResponse(**response_data)


def register(db: Session, register_request: RegisterRequest):
    if db.query(Account).filter(Account.email == register_request.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    account_data = register_request.dict()
    account_data["password"] = hash_password(register_request.password)
    account = Account(**account_data)
    db.add(account)
    db.commit()
    db.refresh(account)

    return AuthResponse(account=account)
