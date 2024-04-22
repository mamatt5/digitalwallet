from fastapi import HTTPException
from models.account import Account, AccountType
from models.merchant import Merchant
from models.user import User
from passlib.context import CryptContext
from schemas.auth_schema import AuthResponse, LoginRequest, RegisterRequest
from sqlmodel import Session


def login(db: Session, login_request: LoginRequest):
    account = authenticate_account(db, login_request.username, login_request.password)
    access_token = create_access_token(account) # need sub as well?
    token = Token(access_token=access_token, token_type="bearer")
    return AuthResponse(token=token, account=account)


def register(db: Session, register_request: RegisterRequest):
    """
    Register a new user on register request

    Args:
        db (Session): Database session
        register_request (RegisterRequest): The registration request containing the users information

    Returns:
        AuthResponse: The authentication response containing the created account

    Raises:
        HTTPException: If the email or phone number is already registered
    
    Status Codes:
        - 200 OK: The user was successfully registered
        - 400 Bad Request: The provided email or phone number is already registered
    """
    if db.query(Account).filter(Account.email == register_request.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    if db.query(Account).filter(Account.phone_number == register_request.phone_number).first():
        raise HTTPException(status_code=400, detail="Phone number already registered")

    account_data = register_request.dict()
    account_data["password"] = hash_password(register_request.password)
    account = Account(**account_data)
    db.add(account)
    db.commit()
    db.refresh(account)

    return AuthResponse(account=account)
