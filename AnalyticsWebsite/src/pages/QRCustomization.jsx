import React from 'react';

import QRCodeGenerator from '../utils/QRCodeGenerator.jsx';

const QRCustomization = () => {

  return (
    <div className="page-container">
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

        <h1>QR Customisation</h1>
        
        <div style={{width: "950px"}}>

          <ol style={{margin: "0 0 20px 20px", textAlign: "left"}}>
            <li>Upload a png image to customise the appearance of your QR code.</li>
            <li>For rectangular images, pick a colour from your image to fill out the background of your QR code.</li>
          </ol>

          <QRCodeGenerator />

        </div>
      
      </div>
    </div>
  );
};

export default QRCustomization;