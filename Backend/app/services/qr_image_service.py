from models.qr_image import QRImage
from repositories.qr_image_repository import QRImageRepository
from fastapi import Depends


class QRImageService:

    def __init__(self, qr_image_repository: QRImageRepository = Depends(QRImageRepository)):
        self.qr_image_repository = qr_image_repository
        
    def create_image(self, name: str, data: bytes, merchant_id: int) -> QRImage:
        image = QRImage(name=name, data=data, merchant_id=merchant_id)
        return self.qr_image_repository.create(image)

    def get_qr_image(self, qr_image_id: int) -> QRImage:
        return self.qr_image_repository.get_by_id(qr_image_id)

    def get_qr_images(self) -> list[QRImage]:
        return self.qr_image_repository.get_all()
    
    def delete_qr_image(self, qr_image_id: int) -> None:
        self.qr_image_repository.delete(qr_image_id)
    
    def update_qr_image(self, qr_image: QRImage) -> None:
        self.qr_image_repository.update(qr_image)