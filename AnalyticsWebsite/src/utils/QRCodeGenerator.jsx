import React, { useState } from 'react';
import { QRCode } from '@jackybaby/react-custom-qrcode';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('https://github.com/gcoro/react-qrcode-logo');
  const [image, setImage] = useState(null);
  const [logoOpacity, setLogoOpacity] = useState(0.5); 

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <label>Image File (optional):</label>
      <input type="file" id="imageLoader" name="imageLoader" onChange={handleImageChange} />
      <p>
        Select an image to customise the QR code.
      </p>
      <div className="center">
        {image && <img src={image} alt="Uploaded" style={{ width: '200px', height: '200px' }} />}
      </div>
      <label>URL*:</label>
      <input
        className="w3-input"
        id="text"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      <div className="center">
        <QRCode
          value={url}
          size={256}
          bgColor="transparent"
          fgColor="#000000"
          logoImage={image}
          logoWidth={256} 
          logoHeight={256} 
          logoOpacity={logoOpacity}
          removeQrCodeBehindLogo={false}
          qrStyle="dots"
          ecLevel="H"
          id="myQRCode"
        />
      </div>
      <br />
      <div className="center">
        <button className="w3-button w3-white w3-border w3-border-blue" style={{ margin: '0 auto' }} onClick={() => downloadQRCode('myQRCode')}>
          Download PNG
        </button>
      </div>
    </div>
  );
};

const downloadQRCode = (id) => {
  const canvas = document.getElementById(id).querySelector('canvas');
  const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  let downloadLink = document.createElement('a');
  downloadLink.href = pngUrl;
  downloadLink.download = 'qr_image.png';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export default QRCodeGenerator;
