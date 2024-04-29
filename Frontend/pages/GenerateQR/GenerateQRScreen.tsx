import React, {useState} from "react";
import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import QRCode from 'react-qr-code';
import axios from "axios";

const GenerateQRScreen = ({navigation}) => {
  const [showImage, setShowImage] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null); 

  const generateQRCode = () => {
    try {
      axios.post('http://192.168.1.111:8000/validate_qr').then(response => {
        setQrCodeData(response.data)
      })
      setShowImage(true);
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    }
    setShowImage(true)
    const qrCodeData_test = {
      "merchant": "ShopA",
      "ABN": 123,
      "price": 40
    }
    setQrCodeData(qrCodeData_test)
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              {'Generate QR Code'}
            </Text>
            <View style={{ margin:20, width:200}}>
              <Button buttonColor="#ffffff" textColor="#000000" onPress={generateQRCode}>
                  <Text style={{fontWeight:"bold"}}>
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