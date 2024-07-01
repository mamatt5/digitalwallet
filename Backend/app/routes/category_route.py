from models.category import Category
from services.category_service import CategoryService
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.post("/addcategory")
def add_category_route(category: Category, category_service: CategoryService = Depends(CategoryService)) -> None:
    category_service.add_category(category)


@router.get("/getcategories")
def get_categorys_route(category_service: CategoryService = Depends(CategoryService)) -> list[Category]:
    return category_service.get_categories()


@router.get("/getcategory/{category_id}")
def get_category_route(category_id: int, category_service: CategoryService = Depends(CategoryService)) -> Category:
    return category_service.get_category(category_id)

@router.delete("/deletecategory/{category_id}")
def delete_category_route(category_id: int, category_service: CategoryService = Depends(CategoryService)) -> None:
    category_service.delete_category(category_id)