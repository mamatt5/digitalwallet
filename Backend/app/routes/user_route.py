from database import get_db_session
from fastapi import APIRouter, Depends
from schemas.user_schema import UserRequest, UserResponse
from services.user_service import create_user, get_all_users
from sqlmodel import Session

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserResponse)
def create_user_route(user: UserRequest, db: Session = Depends(get_db_session)):
    """
    **Create User Endpoint**
    - Request Body: `UserRequest`
    - Returns: `UserResponse`
    """
    return create_user(db, user)


@router.get("/", response_model=list[UserResponse])
def get_all_users_route(db: Session = Depends(get_db_session)):
    """
    **Get All Users Endpoint**
    - Returns: List of `UserResponse`
    """
    return get_all_users(db)
