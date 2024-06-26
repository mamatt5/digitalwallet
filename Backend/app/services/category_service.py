from models.category import Category
from repositories.category_repository import CategoryRepository
from fastapi import Depends

class CategoryService:

    def __init__(self, category_repository: CategoryRepository = Depends(CategoryRepository)):
        self.category_repository = category_repository

    def add_category(self, category: Category) -> None:
        category = self.category_repository.create(category)

    def get_category(self, category_id: int) -> Category:
        return self.category_repository.get_by_id(category_id)
    
    def get_categories(self) -> list[Category]:
        return self.category_repository.get_all()
    
    def delete_category(self, category_id: int) -> None:
        self.category_repository.delete(category_id)