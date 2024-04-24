from contextlib import asynccontextmanager

from database import get_db_session, init_db
from dataloader import generate_dummy_data, insert_dummy_data
from fastapi import FastAPI
from routes import auth_route, test_protected_route


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the applications lifecycle

    On startup:
    - Initialises the database
    - Generates dummy data into the database

    On shutdown:
    - Handles resource cleanup, closes database connection
    """

    # Startup: Initialise the database and generate dummy data
    init_db()

    num_records = 10
    dummy_data = generate_dummy_data(num_records)
    with next(get_db_session()) as session:
        insert_dummy_data(session, dummy_data)

    # Application execution
    yield

    # Shutdown
    pass


# Creates a FastAPI instance
app = FastAPI(lifespan=lifespan)

# Include the routes/endpoints for the app
app.include_router(auth_route.router)
app.include_router(test_protected_route.router)
