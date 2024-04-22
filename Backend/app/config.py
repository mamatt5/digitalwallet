import os

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

JWT_ALGORITHM = "HS256"
PASSWORD_HASH_ALGORITHM = "bcrypt"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
