from fastapi import FastAPI

from database import get_db_session, init_db
from dataloader import (generate_dummy_data,  # Import functions
                        insert_dummy_data)
from routes import merchant_route, user_route

app = FastAPI()


@app.on_event("startup")
def on_startup():
    init_db()

    # Generate and insert dummy data
    num_records = 10
    dummy_data = generate_dummy_data(num_records)
    with next(get_db_session()) as session:
        insert_dummy_data(session, dummy_data)


app.include_router(user_route.router)
app.include_router(merchant_route.router)
