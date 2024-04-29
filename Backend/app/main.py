from database import get_db_session, init_db
from dataloader import generate_dummy_data, insert_dummy_data
from fastapi import FastAPI
from routes import auth_route, merchant_route, user_route
import generateQRCode2

# Creates a FastAPI instance
app = FastAPI()


@app.on_event("startup")
def on_startup():
    """
    Startup event handler

    This function is called when the application starts up
    It initialises the database and generates and inserts dummy data
    """
    
    # Initialise the database tables
    init_db()

    # Generate and insert dummy data
    num_records = 10
    dummy_data = generate_dummy_data(num_records)
    with next(get_db_session()) as session:
        insert_dummy_data(session, dummy_data)


# Include the routes/endpoints for the app
app.include_router(user_route.router)
app.include_router(merchant_route.router)
app.include_router(auth_route.router)
app.include_router(generateQRCode2.router)
