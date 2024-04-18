from fastapi import FastAPI
from dataloader import generate_dummy_data, insert_dummy_data  # Import functions
from database import init_db
from routes import merchant_route, user_route

app = FastAPI()

async def on_startup():
    # Connect to the database 
    init_db()  

    # Generate and insert dummy data
    num_records = 10
    dummy_data = generate_dummy_data(num_records)
    engine = create_engine("sqlite:///database.db")  # Create engine here
    insert_dummy_data(engine, dummy_data)


    init_db()  # Call init_db if needed after data population
    app.include_router(user_route.router)
    app.include_router(merchant_route.router)

