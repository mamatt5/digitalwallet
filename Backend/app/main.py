from database import get_db_session, init_db
from dataloader import generate_dummy_data, insert_dummy_data
from fastapi import FastAPI
from routes import auth_route, merchant_route, user_route
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the applications lifecycle

    On startup:
    - Initializes the database
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
    
    # Yield to application execution
    yield

    # Shutdown
    pass


# Creates a FastAPI instance
app = FastAPI(lifespan=lifespan)

# Include the routes/endpoints for the app
app.include_router(user_route.router)
app.include_router(merchant_route.router)
app.include_router(auth_route.router)
