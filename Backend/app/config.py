import os

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
DEV_DATABASE_URL = os.getenv("DEV_DATABASE_URL")
TEST_DATABASE_URL = os.getenv("TEST_DATABASE_URL")

JWT_ALGORITHM = "HS256"
PASSWORD_HASH_ALGORITHM = "bcrypt"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
