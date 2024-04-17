from database import init_db
from routes import merchant_route, user_route
from fastapi import FastAPI

app = FastAPI()


@app.on_event("startup")
def on_startup():
    init_db()


app.include_router(user_route.router)
app.include_router(merchant_route.router)
