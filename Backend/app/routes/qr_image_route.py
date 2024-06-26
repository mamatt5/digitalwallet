from models.qr_image import QRImage
from services.qr_image_service import QRImageService
from fastapi import APIRouter, File, Form, UploadFile, HTTPException, Depends
from fastapi.responses import StreamingResponse
from typing import Dict
import magic
import io

router = APIRouter(prefix="/qr_images", tags=["QRImages"])

@router.post("/add")
async def upload_image_route(name: str = Form(...), merchant_id: int = Form(...), file: UploadFile = File(...), qr_image_service: QRImageService = Depends(QRImageService)) -> Dict:
    try:
        file_data = await file.read()
        image = qr_image_service.create_image(name=name, data=file_data, merchant_id=merchant_id)
        return {"id": image.qrimage_id, "name": image.name, "merchant_id": image.merchant_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Image upload failed") from e

# @router.post("/add")
# async def upload_image_route(name: str, merchant_id: int, file: UploadFile = File(...),  qr_image_service: QRImageService = Depends(QRImageService)) -> Dict:
#     try:
#         file_data = await file.read()
#         image = qr_image_service.create_image(name=name, data=file_data, merchant_id=merchant_id)
#         return {"id": image.qrimage_id, "name": image.name, "merchant_id": image.merchant_id}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail="Image upload failed") from e


@router.get("/get/{qr_image_id}")
def get_qr_image_route(qr_image_id: int, qr_image_service: QRImageService = Depends(QRImageService)) -> QRImage:
    image = qr_image_service.get_qr_image(qr_image_id)
    if image is None:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Use python-magic to detect the MIME type
    mime = magic.Magic(mime=True)
    mime_type = mime.from_buffer(image.data)
    
    return StreamingResponse(io.BytesIO(image.data), media_type=mime_type)


@router.put("/update")
async def update_qr_image_route(name: str, merchant_id: int, file: UploadFile = File(...),  qr_image_service: QRImageService = Depends(QRImageService)) -> Dict:
    try:
        file_data = await file.read()
        image = qr_image_service.create_image(name=name, data=file_data, merchant_id=merchant_id)
        return {"id": image.qrimage_id, "name": image.name, "merchant_id": image.merchant_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Image upload failed") from e


@router.delete("/delete/{qr_image_id}")
def delete_qr_image_route(qr_image_id: int, qr_image_service: QRImageService = Depends(QRImageService)) -> None:
    qr_image_service.delete_qr_image(qr_image_id)