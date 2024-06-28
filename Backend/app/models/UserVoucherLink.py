from sqlmodel import Field, Relationship, SQLModel

class UserVoucherLink(SQLModel, table = True):
    user_id: int | None = Field(default=None, foreign_key="user.account_id", primary_key=True)
    voucher_id: int | None = Field(default=None, foreign_key="voucher._voucher_id", primary_key=True)
