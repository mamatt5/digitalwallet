from models.account import Account


class User(Account, table=True):
    first_name: str
    last_name: str
