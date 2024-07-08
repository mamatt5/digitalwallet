import React, { useState, useEffect, useRef } from 'react';
import { QRCode } from '@jackybaby/react-custom-qrcode';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useAuth } from '../contexts/AuthContext';
import Card from '@mui/material/Card';

const QRCodeGenerator = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [logoOpacity] = useState(0.55);
  const [logoDimensions, setLogoDimensions] = useState({ width: 450, height: 450 });
  const { user } = useAuth();
  const [bgColor, setBgColor] = useState('transparent'); 
  const [hiddenBgColor, setHiddenBgColor] = useState('transparent');
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);

  const canvasCursorUrl = 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M20.71 5.63c.39-.39.39-1.02 0-1.41l-1.34-1.34c-.39-.39-1.02-.39-1.41 0l-2.34 2.34 2.75 2.75 2.34-2.34zM17.34 8.29l-2.75-2.75-8.96 8.96c-.09.09-.16.2-.21.32l-1.73 4.01a.996.996 0 001.27 1.27l4.01-1.73c.12-.05.23-.12.32-.21l8.96-8.96z" fill="white" stroke="black" stroke-width="1"/>
    </svg>
  `);
  const API_BASE_URL = `http://${process.env.REACT_APP_LOCAL_IP}:8000`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;
        const width = 450;
        const height = (naturalHeight / naturalWidth) * width;
        setLogoDimensions({ width, height });
        setImage(reader.result);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const img = new Image();
      img.onload = () => {
        canvas.width = 450;
        canvas.height = 450;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let drawWidth = 450;
        let drawHeight = (img.naturalHeight / img.naturalWidth) * 450;
        if (drawHeight > 450) {
          drawHeight = 450;
          drawWidth = (img.naturalWidth / img.naturalHeight) * 450;
        }
        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
      };
      img.src = image;
    }
  }, [image]);

  const handleSave = async () => {
    if (!image) {
      alert("An image is required");
      return;
    }

    const canvas = hiddenCanvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 450;
    canvas.height = 450;

    // Draw the frames @ 100 pct opacity
    const frameHeight = (450 - logoDimensions.height) / 2;
    ctx.fillStyle = hiddenBgColor;
    ctx.globalAlpha = 1;
    if (frameHeight > 0) {
      ctx.fillRect(0, 0, 450, frameHeight);
      ctx.fillRect(0, 450 - frameHeight, 450, frameHeight);
    }

    // Draw the QR code
    const qrCanvas = document.getElementById('myQRCode').querySelector('canvas');
    if (qrCanvas) {
      ctx.drawImage(qrCanvas, 0, 0, 450, 450);
    }

    // Draw the logo with 100% opacity
    const img = new Image();
    img.onload = () => {
      ctx.globalAlpha = 1; 
      ctx.drawImage(img, (450 - logoDimensions.width) / 2, (450 - logoDimensions.height) / 2, logoDimensions.width, logoDimensions.height);

      // Convert canvas to data URL and save
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('name', imageName);
        formData.append('merchant_id', user.account_id);
        formData.append('file', blob);

        const response = await fetch(`${API_BASE_URL}/qr_images/add`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          alert('Image saved');
        } else {
          alert('Failed to save image');
        }
      });
    };
    img.src = image;
  };  

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${logoOpacity})`;
    const hiddenColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
    setBgColor(color);
    setHiddenBgColor(hiddenColor);
  };

  const frameHeight = (450 - logoDimensions.height) / 2;

  return (
    <div style={{ width: '950px', margin: '0 auto', textAlign: 'center' }}>
      <Card sx={{ padding: '1rem', borderRadius: '8px' }}>
        <TextField
          variant="outlined"
          type="file"
          id="imageLoader"
          name="imageLoader"
          onChange={handleImageChange}
          sx={{ 
            width: '100%', 
            margin: '0 auto 1rem auto', 
            padding: '0!important', 
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'1rem', gap:'1rem' }}>
          <Box
            sx={{
              position: 'relative',
              width: '450px',
              height: '450px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ccc',
              backgroundColor: '#f0f0f0',
            }}
          >
            {image ? (
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                style={{ cursor: `url(${canvasCursorUrl}) 12 12, auto`, width: '100%', height: '100%' }}
              />
            ) : (
              <p style={{color:'black'}}>Upload an image.</p>
            )}
          </Box>
          <Box
            sx={{
              position: 'relative',
              width: '450px',
              height: '450px',
            }}
          >
            {/* Top part of frame */}
            {frameHeight > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: `${frameHeight - 0.25}px`,
                  backgroundColor: bgColor,
                  opacity: 1,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Bottom part of frame */}
            {frameHeight > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: `${frameHeight}px`,
                  backgroundColor: bgColor,
                  opacity: 1,
                  pointerEvents: 'none',
                }}
              />
            )}

            <QRCode
              value={' '.repeat(150)}
              size={450}
              bgColor="transparent"
              qrStyle="dots"
              ecLevel="H"
              id="myQRCode"
              removeQrCodeBehindLogo={false}
              logoImage={image}
              logoWidth={logoDimensions.width}
              logoHeight={logoDimensions.height}
              logoOpacity={logoOpacity}
              quietZone='0'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: '450px',
            height: '450px',
            display: 'none', // Hide the canvas
          }}
        >
          {/* Top part of frame */}
          {frameHeight > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: `${frameHeight - 0.25}px`,
                backgroundColor: hiddenBgColor,
                opacity: 1,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Bottom part of frame */}
          {frameHeight > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: `${frameHeight}px`,
                backgroundColor: hiddenBgColor,
                opacity: 1,
                pointerEvents: 'none',
              }}
            />
          )}

          <QRCode
            value={' '.repeat(150)}
            size={450}
            bgColor="transparent"
            qrStyle="dots"
            ecLevel="H"
            id="hiddenQRCode"
            removeQrCodeBehindLogo={false}
            logoImage={image}
            logoWidth={logoDimensions.width}
            logoHeight={logoDimensions.height}
            logoOpacity={1}
            quietZone='0'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
        <canvas ref={hiddenCanvasRef} style={{ display: 'none' }}></canvas>
        <button style={{ marginBottom: '0' }} onClick={handleSave}>Save QR Code</button>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
