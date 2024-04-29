from datetime import datetime, timedelta, timezone
from typing import Annotated

from config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    JWT_ALGORITHM,
    PASSWORD_HASH_ALGORITHM,
    SECRET_KEY,
)
from database import get_db_session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from models.account import Account
from passlib.context import CryptContext
from pydantic import EmailStr
from schemas.auth_schema import TokenData
from sqlmodel import Session

# OAuth token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

# CryptContext instance for password hashing
password_context = CryptContext(schemes=[PASSWORD_HASH_ALGORITHM], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify if the plain password matches the hashed password

    Args:
        plain_password (str): The plain password to verify
        hashed_password (str): The hashed password to compare

    Returns:
        bool: True or False if the passwords match
    """
    return password_context.verify(plain_password, hashed_password)


def hash_password(password: str) -> str:
    """
    Hash the password using hashing scheme (Bcrypt)

    Args:
        password (str): The plain password

    Returns:
        str: The hashed password
    """
    return password_context.hash(password)


def create_access_token(email: EmailStr, expires_delta: timedelta | None = None) -> str:
    """
    Create an access token

    Args:
        email (EmailStr): The email of the account
        expires_delta (timedelta): The time delta for token expiration

    Returns:
        str: The encoded access token
    """
    to_encode = {"sub": email}
    expire = (
        datetime.now(tz=timezone.utc) + expires_delta
        if expires_delta
        else datetime.now(tz=timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=JWT_ALGORITHM)


def get_current_account(
    token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db_session)],
) -> Account:
    """
    Gets the current account from access token

    Args:
        token (str): Access token
        db (Session): Database session

    Returns:
        Account: The account associated with the access token

    Raises:
        HTTPException: If the token is invalid or the account is not found
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])
        token_data = TokenData(**payload)
        account = db.query(Account).filter(Account.email == token_data.email).first()
        if account is None or token_data.exp < datetime.now(tz=timezone.utc):
            raise credentials_exception
    except JWTError as err:
        raise credentials_exception from err
    return account
