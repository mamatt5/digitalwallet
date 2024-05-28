import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet, Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMerchant, getUser } from '../../api/api';

const { width, height } = Dimensions.get('window');
const scale = width / 320;

function GenerateGenericQR({ route, navigation }) {
  const { account } = route.params;

  const [qrValue, setQrValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [merchant, setMerchant] = useState('');
  const [walletId, setWalletId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const fetchAccountInfo = async () => {
    if (account.account_type === 'user') {
      try {
        const response = await getUser(account.account_id);
        setMerchant(response.first_name);
      } catch (error) {
        console.error('Get User error:', error);
      }
    } else if (account.account_type === 'merchant') {
      try {
        const response = await getMerchant(account.account_id);
        setMerchant(response.company_name);
      } catch (error) {
        console.error('Get Merchant error:', error);
      }
    }
  };

  useEffect(() => {
    fetchAccountInfo();
    setWalletId(account.wallet.wallet_id);
  }, []);

  const generateQRCode = () => {
    if (!amount) return;

    const formattedAmount = parseFloat(amount).toFixed(2);

    const date = new Date();
    const qrData = {
      account_id: account.account_id,
      wallet_id: walletId, // wallet_id of the merchant
      merchant,
      amount: formattedAmount,
      description,
    };

    setQrValue(JSON.stringify(qrData));
    setIsActive(true);
    console.log(qrData);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Generate QR code</Text>
          {account.account_type === 'user' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('GenerateQRMerchant')}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons name="qrcode" size={25 * scale} color="#FFF" />
          </TouchableOpacity>
          )}
        </View>

        <View style={styles.generatorContainer}>
          {!isActive && (
            <>
              <Text style={styles.subheaderText}>Payment value:</Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor="lightgray"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text style={styles.subheaderText}>Description:</Text>
              <TextInput
                placeholder="for groceries"
                placeholderTextColor="lightgray"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <TouchableOpacity onPress={generateQRCode}>
                <Button
                  style={styles.generateButton}
                  textColor="black"
                >
                  Generate QR Code
                </Button>
              </TouchableOpacity>
            </>
          )}

          {isActive && (
            <View style={styles.qrcode}>
              <QRCode
                value={qrValue}
                size={350}
                color="black"
                backgroundColor="white"
              />

              <Button
                style={styles.generateButton}
                textColor="black"
                onPress={() => setIsActive(false)}
              >
                Generate new QR
              </Button>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default GenerateGenericQR;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 20 * scale,
  },
  generateButton: {
    backgroundColor: '#ffffff',
    marginTop: 60,
  },
  generatorContainer: {
    marginTop: 35 * scale,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20 * scale,
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: '#ffffff',
    fontSize: 24,
    height: 40,
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 10,
  },
  qrcode: {
    alignItems: 'center',
    marginTop: 30,
  },
  screenContainer: {
    backgroundColor: '#0f003f',
    height: 2000,
  },
  subheaderText: {
    color: '#ffffff',
    fontSize: 14 * scale,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
