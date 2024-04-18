from models.account import Account, AccountType
from models.user import User
from schemas.user_schema import UserRequest
from sqlmodel import Session


def create_user(db: Session, user: UserRequest):
    account_data = user.account.dict()
    account_data["account_type"] = AccountType.USER
    account = Account(**account_data)
    db.add(account)
    db.commit()
    db.refresh(account)

    new_user = User(**user.dict(exclude={"account"}), account=account)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_all_users(db: Session):
    return db.query(User).all()
