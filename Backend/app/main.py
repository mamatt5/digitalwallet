from fastapi import FastAPI
from dataloader import generate_dummy_data
from sqlmodel import create_engine, Session

from database import init_db
from routes import merchant_route, user_route

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()
    dummy_data = generate_dummy_data(10)

    engine = create_engine("sqlite:///database.db")
    with Session(engine) as session:
        session.add_all(dummy_data)
        session.commit()

app.include_router(user_route.router)
app.include_router(merchant_route.router)

