from models.account import Account


class Merchant(Account, table=True):
    company_name: str
    ABN: str
