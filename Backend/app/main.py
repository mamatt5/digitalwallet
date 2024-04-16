from fastapi import FastAPI
from routers import user_route

app = FastAPI()

app.include_router(user_route.router)