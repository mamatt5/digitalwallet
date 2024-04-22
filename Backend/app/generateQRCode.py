from itsdangerous import URLSafeSerializer
import qrcode
import json

secret_key = "iyhaykicyhmqdqxygyqyklklsyseslqbggggzyzdysbqdddsy"
serializer = URLSafeSerializer(secret_key)

qr = qrcode.QRCode(version=1, box_size=10, border=5)
data = {
    "merchant": "ShopA",
    "ABN": 123,
    "price": 40
}
encoded_data = json.dumps(data)
signed_data = serializer.dumps(encoded_data)
qr.add_data(signed_data)

qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save("qrcode.png")