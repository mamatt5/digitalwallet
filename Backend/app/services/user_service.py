from models.user import User
from schemas.user_schema import UserRequest
from sqlmodel import Session


def create_user(db: Session, user: UserRequest):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_all_users(db: Session):
    return db.query(User).all()
