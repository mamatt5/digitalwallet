from sqlmodel import Session, SQLModel, create_engine

# Create a database engine using SQLite
DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL)


def init_db():
    """
    Initialise the database

    Creates all the tables in the database based on the SQLModel models
    """
    SQLModel.metadata.create_all(engine)


def get_db_session():
    """
    Get a database session

    Yields:
        Session: A database session object (SQLModel)

    Creates a new session, yields it for use, and closes the session when complete
    """
    with Session(engine) as session:
        yield session
