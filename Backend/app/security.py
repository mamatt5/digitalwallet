

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

# CryptContext instance for password hashing
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    """
    Verify if the plain password matches the hashed password

    Args:
        plain_password (str): The plain password to verify
        hashed_password (str): The hashed password to compare

    Returns:
        bool: True or False if the passwords match
    """
    return password_context.verify(plain_password, hashed_password)


def hash_password(password):
    """
    Hash the password using hashing scheme (Bcrypt)

    Args:
        password (str): The plain password

    Returns:
        str: The hashed password
    """
    return password_context.hash(password)


def authenticate_account(db: Session, email: str, password: str):
    # should be get_user? user = get_user(fake_db, username)
    account = db.query(Account).filter(Account.email == email).first()
    if not account or not verify_password(password, account.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return account


def get_current_account(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db_session)):
    account = db.query(Account).filter(Account.account_id == int(token)).first()
    if not account:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    return account