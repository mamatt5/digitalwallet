# Faker

from faker import Faker
from models.merchant import Merchant
from models.user import User

fake = Faker()

def generate_dummy_data(num_records):
    data = []
    for _ in range(num_records):
        account_data = {
            "email": fake.email(),
            "password": fake.password()
        }
        if fake.boolean():
            account_data.update({
                "company_name": fake.company(),
                "ABN": fake.msisdn()  
            })
            account = Merchant(**account_data)
        else:
            account_data.update({
                "first_name": fake.first_name(),
                "last_name": fake.last_name()
            })
            account = User(**account_data)
        
        data.append(account)
    return data