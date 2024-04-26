import React, {useState} from "react";
import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
//import qrcode from '../../../Backend/app/qrcode.png';
import { fetch } from 'react-native-fetch';
import QRCode from 'react-qr-code';

const GenerateQRScreen = ({navigation}) => {
  const [showImage, setShowImage] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null); 

  const generateQRCode = async () => {
    try {
      const response = await fetch('http://192.168.1.111:8081/generate_qr'); //Endpoint 
      const data = await response.json();
      setQrCodeData(data.data); //data.qrCodeData
      setShowImage(true);
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    }
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