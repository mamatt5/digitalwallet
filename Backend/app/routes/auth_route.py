from database import get_db_session
from fastapi import APIRouter, Depends
from schemas.auth_schema import AuthResponse, LoginRequest, RegisterRequest
from services.auth_service import login, register
from sqlmodel import Session

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=AuthResponse)
def login_route(login_request: LoginRequest, db: Session = Depends(get_db_session)):
    """
    **Login/Authenticate Endpoint**

    - Request Body: `LoginRequest`
    - Returns: `AuthResponse`
    - Raises: `HTTPException` email or password is invalid
    """
    return login(db, login_request)


@router.post("/register", response_model=AuthResponse)
def register_route(register_request: RegisterRequest, db: Session = Depends(get_db_session)):
    """
    **Register Endpoint**

    - Request Body: `RegisterRequest`
    - Returns: `AuthResponse`
    - Raises: `HTTPException` email or phone number is already registered
    """
    
  
    return register(db, register_request)
