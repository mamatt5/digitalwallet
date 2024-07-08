from sqlmodel import Field, Relationship, SQLModel

class UserVoucherLink(SQLModel, table = True):
    link_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.account_id", primary_key=False)
    voucher_id: int | None = Field(default=None, foreign_key="voucher.voucher_id", primary_key=False)
