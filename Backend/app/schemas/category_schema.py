from pydantic import BaseModel, Field

class CategoryData(BaseModel):
    category_id: int = Field(..., description='Category id')
    category_name: str = Field(..., description='Category name')