#has expiring time but needs front end to call api to generate and get

from fastapi import FastAPI, Body, HTTPException, APIRouter
from itsdangerous import URLSafeSerializer
import qrcode
import json
from datetime import datetime
from pydantic import BaseModel

router = APIRouter()

secret_key = "iyhaykicyhmqdqxygyqyklklsyseslqbggggzyzdysbqdddsy"
serializer = URLSafeSerializer(secret_key)

# Dictionary to store data and expiration time for each QR code
qr_data = {}  

@router.get("/generate_qr")
async def generate_qr(data: dict = Body(...)): ##   generate_qr(data: dict = Body(...))
  # Extract expiration time from data
  expiration_time = data.get('expiration_time')  
  if not expiration_time:
    raise HTTPException(status_code=400, detail="Missing expiration time in request")
  try:
    # Convert expiration time string to datetime object
    expiration_time_obj = datetime.strptime(expiration_time, "%Y-%m-%dT%H:%M:%SZ")
  except ValueError:
    raise HTTPException(
      status_code=400, detail="Invalid expiration time format. Use YYYY-MM-DDTHH:MM:SSZ"
    )

  ######################### OVERWRITING DATA FOR TEST
  data = {
    "merchant": "ShopA",
    "ABN": 123,
    "price": 40,
  }

  encoded_data = serializer.dumps(data)
  qr = qrcode.QRCode(version=1, box_size=10, border=5)
  qr.add_data(encoded_data)
  qr.make(fit=True)
  img = qr.make_image(fill_color="black", back_color="white")
  img.save("qrcode2.png")

  # Store data with ID
  qr_id = len(qr_data) + 1  # Generate unique ID
  qr_data[qr_id] = {"data": encoded_data, "expiration": expiration_time_obj}

  return {"message": "QR code generated successfully", "id": qr_id}

@router.get("/get_qr_data")
async def get_qr_data(qr_id: int = Body(...)):
    """
    Retrieves data associated with a QR code if it exists and is not expired.
    """
    if qr_id not in qr_data:
        raise HTTPException(status_code=404, detail="QR code not found")

    qr_info = qr_data[qr_id]
    current_time = datetime.utcnow()

    if current_time > qr_info["expiration"]:
        raise HTTPException(status_code=400, detail="QR code expired")

    return {"data": serializer.loads(qr_info["data"])}

class QRCodeData(BaseModel):
    merchant: str
    ABN: int
    price: float

@router.post("/validate_qr")
async def validate_qr(qr_code_data: QRCodeData):
  return qr_code_data
