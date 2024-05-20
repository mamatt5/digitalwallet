import os

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEV_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'dev_database.db')}"
TEST_DATABASE_URL = os.getenv("TEST_DATABASE_URL")

JWT_ALGORITHM = "HS256"
PASSWORD_HASH_ALGORITHM = "bcrypt"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
