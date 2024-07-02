import random
import string
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from models.card import Card
from models.account import Account, AccountType
from models.merchant import Merchant
from models.user import User
from models.wallet import Wallet
from repositories.account_repository import AccountRepository
from repositories.merchant_repository import MerchantRepository
from repositories.user_repository import UserRepository
from repositories.wallet_repository import WalletRepository
from repositories.card_repository import CardRepository
from schemas.auth_schema import AuthResponse, RegisterRequest, Token
from security import create_access_token, hash_password, verify_password


class AuthService:
    def __init__(
        self,
        account_repository: AccountRepository = Depends(AccountRepository),
        merchant_repository: MerchantRepository = Depends(MerchantRepository),
        user_repository: UserRepository = Depends(UserRepository),
        wallet_repository: WalletRepository = Depends(WalletRepository),
        card_repository: CardRepository = Depends(CardRepository),
    ):
        self.account_repository = account_repository
        self.merchant_repository = merchant_repository
        self.user_repository = user_repository
        self.wallet_repository = wallet_repository
        self.card_repository = card_repository

    def authenticate_account(self, email: str, password: str) -> Account | None:
        """
        Authenticate an account

        Args:
            email (str): Account email
            password (str): Account password

        Returns:
            Account | None: The authenticated account if credentials are valid
        """
        account = self.account_repository.get_by_email(email)
        if account and verify_password(password, account.password):
            return account
        return None

    def login(self, form_data: OAuth2PasswordRequestForm) -> AuthResponse:
        """
        Login an account

        Args:
            form_data (OAuth2PasswordRequestForm): The login form data containing the email and password

        Returns:
            AuthResponse: The authentication response containing the token and account

        Raises:
            HTTPException(400): If the email or password is invalid
        """

        account = self.authenticate_account(form_data.username, form_data.password)
        if not account:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

        access_token = create_access_token(account.email)
        token = Token(access_token=access_token, token_type="bearer")
        return AuthResponse(token=token, account=account)

    def register(self, register_request: RegisterRequest) -> AuthResponse:
        """
        Register a new account

        Args:
            register_request (RegisterRequest): The registration request containing the users information

        Returns:
            AuthResponse: The authentication response containing the token and newly created account

        Raises:
            HTTPException(400): If the email or phone number is already registered
        """
        if self.account_repository.get_by_email(register_request.email):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        if self.account_repository.get_by_phone_number(register_request.phone_number):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Phone number already registered")

        account_data = register_request.model_dump()
        account_data["password"] = hash_password(register_request.password)
        account = Account(**account_data)
        account = self.account_repository.create(account)
        wallet = Wallet(account_id=account.account_id)
        wallet = self.wallet_repository.create(wallet)
        account.wallet = wallet
        wallet.account = account

        access_token = create_access_token(account.email)
        token = Token(access_token=access_token, token_type="bearer")

        if register_request.account_type == AccountType.MERCHANT:
            merchant = Merchant(**account_data)
            merchant.account_id = account.account_id
            self.merchant_repository.create(merchant)

        elif register_request.account_type == AccountType.USER:
            user = User(**account_data)
            user.account_id = account.account_id
            self.user_repository.create(user)

            card_number_available = False
            while not card_number_available:
                card_number = "".join(random.choices(string.digits, k=16))
                card_number_available = not self.card_repository.check_card_number(card_number)

            card = Card(
                card_number=card_number,
                card_expiry="12/27",
                card_cvv="123",
                wallet_id=wallet.wallet_id,)
            card.wallet = wallet
            self.card_repository.create(card)

        return AuthResponse(token=token, account=account)
