from contextlib import asynccontextmanager

import generateQRCode2
from database import init_db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import account_route, auth_route, card_route, test_protected_route,\
    transaction_route, loyalty_card_route, wallet_route, qr_image_route,\
    category_route

# Creates a FastAPI instance
app = FastAPI()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the applications lifecycle

    On startup:
    - Initialises the database

    On shutdown:
    - Handles resource cleanup, closes database connection
    """

    # Startup: Initialise the database and generate dummy data
    init_db()

    # Application execution
    yield


# Creates a FastAPI instance
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes/endpoints for the app
app.include_router(auth_route.router)
app.include_router(test_protected_route.router)
app.include_router(card_route.router)
app.include_router(loyalty_card_route.router)
app.include_router(account_route.router)
app.include_router(generateQRCode2.router)
app.include_router(transaction_route.router)
app.include_router(wallet_route.router)
app.include_router(qr_image_route.router)
app.include_router(category_route.router)