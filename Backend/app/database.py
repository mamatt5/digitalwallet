from sqlmodel import Session, SQLModel, create_engine
from models.account import Account
from models.merchant import Merchant
from models.user import User

DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_db_session():
    with Session(engine) as session:
        yield session
