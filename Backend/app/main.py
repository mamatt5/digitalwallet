from database import init_db
from fastapi import FastAPI
from routes import auth_route, merchant_route, user_route

app = FastAPI()


@app.on_event("startup")
def on_startup():
    init_db()


app.include_router(user_route.router)
app.include_router(merchant_route.router)
app.include_router(auth_route.router)
