from typing import Annotated, List

from database import get_db_session
from fastapi import Depends
from models.qr_image import QRImage
from repositories.base_repository import RepositoryBase
from sqlmodel import Session, delete, select, update



class QRImageRepository(RepositoryBase[QRImage]):
    def __init__(self, session: Annotated[Session, Depends(get_db_session)]):
        super().__init__(session)

    def create(self, qr_image: QRImage) -> QRImage:
        self.session.add(qr_image)
        self.session.commit()
        self.session.refresh(qr_image)
        return qr_image

    def update(self, qr_image: QRImage) -> QRImage:
        statement = update(QRImage).where(QRImage.qrimage_id == qr_image.qrimage_id).values(**qr_image.model_dump())
        self.session.exec(statement)
        self.session.commit()
        self.session.refresh(qr_image)
        return qr_image

    def delete(self, qrimage_id: int) -> bool:
        statement = delete(QRImage).where(QRImage.qrimage_id == qrimage_id)
        result = self.session.exec(statement)
        self.session.commit()
        return result.rowcount > 0

    def get_all(self, skip: int = 0, limit: int = 20) -> List[QRImage]:
        statement = select(QRImage).offset(skip).limit(limit)
        qr_images = self.session.exec(statement).all()
        return qr_images

    def get_by_id(self, qrimage_id: int) -> QRImage | None:
        statement = select(QRImage).where(QRImage.qrimage_id == qrimage_id)
        qr_image = self.session.exec(statement).first()
        return qr_image
    
    def get_by_merchant_id(self, merchant_id: int) -> QRImage | None:
        statement = select(QRImage).where(QRImage.merchant_id == merchant_id)
        qr_image = self.session.exec(statement).first()
        return qr_image