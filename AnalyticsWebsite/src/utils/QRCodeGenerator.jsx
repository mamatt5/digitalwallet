import React, { useState } from 'react';
import { QRCode } from '@jackybaby/react-custom-qrcode';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useAuth } from '../contexts/AuthContext';
import Card from '@mui/material/Card';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [logoOpacity] = useState(0.55);
  const { user } = useAuth();

  console.log(user);

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
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    const fileInput = document.getElementById('imageLoader');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('name', imageName);
    formData.append('merchant_id', user.account_id); 
    formData.append('file', file); 

    const response = await fetch('http://localhost:8000/qr_images/add', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Image saved:', result);
    } else {
      console.error('Failed to save image');
    }
  };

  return (
    <div style={{ width: '550px', margin: '0 auto', textAlign: 'center' }}>
      <p>Select a square logo to customise the QR code.</p><br/>
      <Card sx={{padding:'1rem', borderRadius:'8px'}}>
        <TextField 
          variant="outlined" 
          type="file" 
          id="imageLoader" 
          name="imageLoader" 
          onChange={handleImageChange}
          sx={{ width: '500px', margin: '1rem 0' }}
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
        </Card>
    </div>
  );
};


export default QRCodeGenerator;