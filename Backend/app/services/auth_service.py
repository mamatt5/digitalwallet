from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from models.account import Account
from schemas.auth_schema import AuthResponse, RegisterRequest, Token
from security import create_access_token, hash_password, verify_password
from sqlmodel import Session


def authenticate_account(db: Session, email: str, password: str) -> Account:
    """
    Authenticate an account

    Args:
        db (Session): Database session
        email (str): Email of the account
        password (str): Password of the account

    Returns:
        Account: The authenticated account

    Raises:
        HTTPException: If the email or password is invalid
    """
    account = db.query(Account).filter(Account.email == email).first()
    if not account or not verify_password(password, account.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    return account


def login(db: Session, form_data: OAuth2PasswordRequestForm) -> AuthResponse:
    """
    Login an account

    Args:
        db (Session): Database session
        form_data (OAuth2PasswordRequestForm): The login form data

    Returns:
        AuthResponse: The authentication response containing the token and account
    """
    account = authenticate_account(db, form_data.username, form_data.password)
    access_token = create_access_token(account.email)
    token = Token(access_token=access_token, token_type="bearer")
    return AuthResponse(token=token, account=account)


def register(db: Session, register_request: RegisterRequest) -> AuthResponse:
    """
    Register a new user on register request

    Args:
        db (Session): Database session
        register_request (RegisterRequest): The registration request containing the users information

    Returns:
        AuthResponse: The authentication response containing the token and account

    Raises:
        HTTPException: If the email or phone number is already registered
    """

    if db.query(Account).filter(Account.email == register_request.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    if db.query(Account).filter(Account.phone_number == register_request.phone_number).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Phone number already registered")

    account_data = register_request.model_dump()
    account_data["password"] = hash_password(register_request.password)
    account = Account(**account_data)
    db.add(account)
    db.commit()
    db.refresh(account)

    access_token = create_access_token(account.email)
    token = Token(access_token=access_token, token_type="bearer")
    return AuthResponse(token=token, account=account)
