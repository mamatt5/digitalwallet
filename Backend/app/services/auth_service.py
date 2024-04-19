from fastapi import HTTPException
from models.account import Account, AccountType
from models.merchant import Merchant
from models.user import User
from passlib.context import CryptContext
from schemas.auth_schema import AuthResponse, LoginRequest, RegisterRequest
from sqlmodel import Session

# CryptContext instance for password hashing
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    """
    Verify if the plain password matches the hashed password

    Args:
        plain_password (str): The plain password to verify
        hashed_password (str): The hashed password to compare

    Returns:
        bool: True or False if the passwords match
    """
    return password_context.verify(plain_password, hashed_password)


def hash_password(password):
    """
    Hash the password using hashing scheme (Bcrypt)

    Args:
        password (str): The plain password

    Returns:
        str: The hashed password
    """
    return password_context.hash(password)


def login(db: Session, login_request: LoginRequest):
    """
    Authenticate a user on login request

    Args:
        db (Session): Database session
        login_request (LoginRequest): The login request containing the users credentials

    Returns:
        AuthResponse: The authentication response containing the account data

    Raises:
        HTTPException: If email or password is invalid
    
    Status Codes:
        - 200 OK: The user was successfully authenticated.
        - 401 Unauthorized: The provided email or password is invalid
    """
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
