from config import DEV_DATABASE_URL
from models.account import Account
from models.card import Card
from models.loyalty_card import LoyaltyCard
from models.merchant import Merchant
from models.user import User
from models.wallet import Wallet
from sqlmodel import Session, create_engine, select


def check_database_records():
    engine = create_engine(DEV_DATABASE_URL)

    with Session(engine) as session:
        accounts = session.exec(select(Account)).all()
        cards = session.exec(select(Card)).all()
        loyalty_cards = session.exec(select(LoyaltyCard)).all()
        wallets = session.exec(select(Wallet)).all()
        merchants = session.exec(select(Merchant)).all()
        users = session.exec(select(User)).all()

        print(f"Number of accounts: {len(accounts)}")
        print(f"Number of cards: {len(cards)}")
        print(f"Number of loyalty cards: {len(loyalty_cards)}")
        print(f"Number of wallets: {len(wallets)}")
        print(f"Number of merchants: {len(merchants)}")
        print(f"Number of users: {len(users)}")

        print("\nAccount Details:")
        for account in accounts:
            print(f"Account ID: {account.account_id}, Email: {account.email}, Account Type: {account.account_type}")

        print("\nCard Details:")
        for card in cards:
            print(f"Card ID: {card.card_id}, Card Number: {card.card_number}, Wallet ID: {card.wallet_id}")
            
        print("\nLoyalty Card Details:")
        for loyalty_card in loyalty_cards:
            print(f"Card ID: {loyalty_card.loyalty_card_id}, Card Number: {loyalty_card.card_number}, Wallet ID: {loyalty_card.wallet_id}")

        print("\nWallet Details:")
        for wallet in wallets:
            print(f"Wallet ID: {wallet.wallet_id}, Account ID: {wallet.account_id}")

        print("\nMerchant Details:")
        for merchant in merchants:
            print(f"Merchant ID: {merchant.account_id}, Company Name: {merchant.company_name}, ABN: {merchant.ABN}")

        print("\nUser Details:")
        for user in users:
            print(f"User ID: {user.account_id}, First Name: {user.first_name}, Last Name: {user.last_name}")


if __name__ == "__main__":
    check_database_records()
