import React, { useEffect } from 'react';

import QRCodeGenerator from '../utils/QRCodeGenerator.jsx';

const QRCustomization = () => {

  return (
    <div>
      <h1>QR Code Generator</h1>
        <QRCodeGenerator />
    </div>
  );
};

export default QRCustomization;