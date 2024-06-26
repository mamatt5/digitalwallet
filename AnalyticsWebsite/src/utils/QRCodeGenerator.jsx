import React, { useState } from 'react';
import { QRCode } from '@jackybaby/react-custom-qrcode';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [logoOpacity] = useState(0.55);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageName(file.name); 
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const canvas = document.getElementById('myQRCode');
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('name', imageName); 
      formData.append('merchant_id', '13');
      formData.append('file', blob, 'qrcode.png');
  
      const response = await fetch('http://localhost:8000/qr_images/add', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('QR Code saved:', result);
      } else {
        console.error('Failed to save QR Code');
      }
    });
  };

  return (
    <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
      <p>Select a square logo to customise the QR code.</p>
      <TextField 
        variant="outlined" 
        type="file" 
        id="imageLoader" 
        name="imageLoader" 
        onChange={handleImageChange}
        sx={{ width: '500px', margin: '2rem 0' }}
      />
      <TextField 
        id="outlined-basic" 
        label="URL" 
        variant="outlined"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)} 
        sx={{ width: '500px', marginBottom: '2rem' }}
      />
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '2rem' 
        }}
      >
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
      </Box>
      <button onClick={handleSave}>Save QR Code</button>
    </div>
  );
};

export default QRCodeGenerator;
