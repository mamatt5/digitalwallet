import React, { useEffect, useState } from 'react'
import { getMerchant, getUser } from '../../api/api';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const GenerateGenericQR = ({ route }) => {
    const { account } = route.params
    const [loggedAccount, setLoggedAccount] = useState('');

    const [qrValue, setQrValue] = useState('');
    const [isActive, setIsActive] = useState(false);

    const fetchAccountInfo = async () => {
        if (account.account_type === 'user') {
          try {
            const response = await getUser(account.account_id);
            setLoggedAccount(response.first_name);
          } catch (error) {
            console.error('Get User error:', error);
          }
        } else if (account.account_type === 'merchant') {
          try {
            const response = await getMerchant(account.account_id);
            setLoggedAccount(response.company_name);
          } catch (error) {
            console.error('Get Merchant error:', error);
          }
        }
      };

      useEffect(() => {
        fetchAccountInfo();
      }, []);

      const generateQRCode = () => {
        if (!qrValue) return;

        setIsActive(true);
        }

        const handleInputChange = (text) => {
        setQrValue(text);

        if (!text) {
            setIsActive(false);
        }
        }


  return (
    <SafeAreaView>
        <View>
            <Text>
                Generate QR code, {loggedAccount}!
            </Text>

            <Text> 
                    Paste a URL or enter text to create a QR code 
                </Text> 
                <TextInput 
                    placeholder="Enter text or URL"
                    value={qrValue} 
                    onChangeText={handleInputChange} 
                /> 
                <TouchableOpacity 
                    onPress={generateQRCode} 
                > 
                    <Text> 
                        Generate QR Code 
                    </Text> 
                </TouchableOpacity> 
                {isActive && ( 
                    <View> 
                        <QRCode 
                            value={qrValue} 
                            size={200} 
                            color="black"
                            backgroundColor="white"
                        /> 
                    </View> 
                )} 
        </View>
    </SafeAreaView>
  )
}

export default GenerateGenericQR