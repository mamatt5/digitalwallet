#has expiring time but needs front end to call api to generate and get

from flask import Flask, request, jsonify
from itsdangerous import URLSafeSerializer
import qrcode
import json
from datetime import datetime

app = Flask(__name__)

secret_key = "your_very_secret_key"
serializer = URLSafeSerializer(secret_key)
qr_data = {}  # Dictionary to store data and expiration time for each QR code

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
  data = request.get_json()  # Get data from request body
  expiration_time = data.get('expiration_time')  # Extract expiration time from data
  if not expiration_time:
    return jsonify({'error': 'Missing expiration time in request'}), 400

  # Convert expiration time string to datetime object (adjust format if needed)
  expiration_time_obj = datetime.strptime(expiration_time, '%Y-%m-%dT%H:%M:%SZ')

  encoded_data = serializer.dumps(data)
  qr = qrcode.QRCode(version=1, box_size=10, border=5)
  qr.add_data(encoded_data)
  qr.make(fit=True)
  img = qr.make_image(fill_color="black", back_color="white")
  img.save("qrcode2.png")

  qr_data[data['id']] = {'data': encoded_data, 'expiration': expiration_time_obj}  # Store data with ID
  return jsonify({'message': 'QR code generated successfully'})

@app.route('/get_qr_data', methods=['POST'])
def get_qr_data():
  data = request.get_json()
  qr_id = data.get('id')
  if not qr_id:
    return jsonify({'error': 'Missing QR code ID in request'}), 400

  if qr_id not in qr_data:
    return jsonify({'error': 'QR code not found'}), 404

  qr_info = qr_data[qr_id]
  current_time = datetime.utcnow()  # Get current time

  if current_time > qr_info['expiration']:
    return jsonify({'error': 'QR code expired'}), 400

  return jsonify({'data': serializer.loads(qr_info['data'])})

if __name__ == '__main__':
  app.run(debug=True)