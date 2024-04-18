from fastapi import HTTPException
from models.account import Account, AccountType
from models.merchant import Merchant
from models.user import User
from passlib.context import CryptContext
from schemas.auth_schema import LoginRequest, RegisterRequest
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
    return {"message": "Login successful"}


def register(db: Session, register_request: RegisterRequest):
    if db.query(Account).filter(Account.email == register_request.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    account_data = register_request.dict(
        exclude={"company_name", "ABN", "first_name", "last_name"}
    )
    account_data["password"] = hash_password(register_request.password)
    account = Account(**account_data)
    db.add(account)
    db.commit()
    db.refresh(account)

    if register_request.account_type == AccountType.MERCHANT:
        if not register_request.company_name or not register_request.ABN:
            raise HTTPException(
                status_code=400,
                detail="Company name and ABN are required for merchant registration",
            )
        merchant_data = {
            "account": account,
            "company_name": register_request.company_name,
            "ABN": register_request.ABN,
        }
        merchant = Merchant(**merchant_data)
        db.add(merchant)
    elif register_request.account_type == AccountType.USER:
        if not register_request.first_name or not register_request.last_name:
            raise HTTPException(
                status_code=400,
                detail="First name and last name are required for user registration",
            )
        user_data = {
            "account": account,
            "first_name": register_request.first_name,
            "last_name": register_request.last_name,
        }
        user = User(**user_data)
        db.add(user)

    db.commit()
    return {"message": "Registration successful"}
