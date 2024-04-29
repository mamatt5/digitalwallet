import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import QRCode from 'react-qr-code';
import { validateQRCodeData } from '../../api/api';

function GenerateQRScreen() {
  const [showImage, setShowImage] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);

  const generateQRCode = async () => {
    const qrCodeDataTest = {
      merchant: 'ShopA',
      ABN: 123,
      price: 40,
    };

    try {
      const data = await validateQRCodeData(qrCodeDataTest);
      // const formattedData = JSON.stringify(data);
      setQrCodeData(data);
      setShowImage(true);
    } catch (error) {
      console.error('Error validating QR code data:', error);
      setShowImage(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <ScrollView>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
            Generate QR Code
          </Text>
          <View style={{ margin: 20, width: 200 }}>
            <Button buttonColor="#ffffff" textColor="#000000" onPress={generateQRCode}>
              <Text style={{ fontWeight: 'bold' }}>
                Generate
              </Text>
            </Button>
          </View>
          {showImage && (
          <QRCode
            value={qrCodeData}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
          />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default GenerateQRScreen;
