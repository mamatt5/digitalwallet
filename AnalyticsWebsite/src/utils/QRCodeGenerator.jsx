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
    </div>
  );
};

export default QRCodeGenerator;
