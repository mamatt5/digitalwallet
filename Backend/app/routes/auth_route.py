from typing import Annotated

from database import get_db_session
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.auth_schema import AuthResponse, RegisterRequest
from services.auth_service import login, register
from sqlmodel import Session


router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=AuthResponse)
def login_route(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_db_session)]
) -> AuthResponse:
    """
    **Login/Authenticate Endpoint**

    - Request Body: `OAuth2PasswordRequestForm`
    - Returns: `AuthResponse`
    - Raises: `HTTPException` email or password is invalid
    """
    return login(db, form_data)


@router.post("/register", response_model=AuthResponse)
def register_route(register_request: RegisterRequest, db: Annotated[Session, Depends(get_db_session)]) -> AuthResponse:
    """
    **Register Endpoint**

    - Request Body: `RegisterRequest`
    - Returns: `AuthResponse`
    - Raises: `HTTPException` email or phone number is already registered
    """
    return register(db, register_request)
