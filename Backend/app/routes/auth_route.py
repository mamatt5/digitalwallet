from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.auth_schema import AuthResponse, RegisterRequest
from services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=AuthResponse)
def login_route(
    form_data: OAuth2PasswordRequestForm = Depends(), auth_service: AuthService = Depends(AuthService)
) -> AuthResponse:
    """
    **Login/Authenticate Endpoint**

    - Authenticate a user and return an access token and account info
    - Raises HTTPException (401) for invalid email or password
    """
    return auth_service.login(form_data)


@router.post("/register", response_model=AuthResponse)
def register_route(register_request: RegisterRequest, auth_service: AuthService = Depends(AuthService)) -> AuthResponse:
    """
    **Register Endpoint**

    - Register a new user account and return an access token and account info
    - Raises HTTPException (400) if email or phone number is already registered
    """
    return auth_service.register(register_request)
