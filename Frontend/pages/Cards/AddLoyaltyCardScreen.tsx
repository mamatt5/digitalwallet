import React, { useEffect, useRef, useState } from 'react';
import {
   Dimensions, Image, SafeAreaView, Text, TextInput, View, StyleSheet, Keyboard, TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import { addLoyaltyCard } from '../../api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from "expo-camera";

const { width, height } = Dimensions.get('window');
const scale = width / 320;

function AddLoyaltyCardScreen({ navigation, route }) {
  const { account, fetchCards } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [memberName, setMemberName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryDateError, setExpriyDateError] = useState(false)
  const [permission, requestPermission] = useCameraPermissions();

  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handleBarcodeScanned = ({ data }) => {
    setCardNumber(data);
    setIsScannerVisible(false);
    Alert.alert('Barcode Scanned', `Card Number: ${data}`);
  };


  const handleCardNumberChange = (event) => {
    setCardNumber(event)
  }

  const handleMemberNameChange = (event) => {
    setMemberName(event)
  }

  const handleExpiryDate = (event) => {
    setExpriyDateError(false);
    setExpiryYear(event)
  }

  const expiryYearRef = useRef(null);

  useEffect(() => {
    if (expiryMonth.length === 2) {
      expiryYearRef.current.focus();
    }
  }, [expiryMonth]);

  useEffect(() => {
    if (expiryYear.length === 2 && expiryMonth.length === 2) {
      expiryYearRef.current.blur();
    }
  }, [expiryYear, expiryMonth]);

  useEffect(() => {
    if (expiryMonth.length === 2 && expiryYear.length === 2) {
      setExpiryDate(`${expiryMonth}/${expiryYear}`);
    }
  }, [expiryMonth, expiryYear]);

  const handleExpiryMonth = (value: string) => {
    setExpriyDateError(false)

    if (parseInt(value, 10) <= 12) {
      setExpiryMonth(value);
    } else {
      setExpiryMonth('');
    }
  };

  if (!permission) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <View style={styles.permsbuttonContainer}>
          <Button title="Allow Camera" onPress={requestPermission} />
        </View>
      </View>
    );
  }

  const handleAddLoyaltyCard = () => {
    const currentDate = new Date();
    const [month, year] = expiryDate.split('/');
    const inputDate = new Date(`20${year}`, parseInt(month, 10) - 1, 1);
    const newExpiryDateError = expiryDate === '' || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)

    if (newExpiryDateError || inputDate <= currentDate) {
      setExpriyDateError(true)
    }

    if (newExpiryDateError || parseInt(expiryMonth, 10) < 1 || inputDate <= currentDate) {
      return;
    }

    addLoyaltyCard(cardNumber, expiryDate, memberName, account.wallet.wallet_id)
      .then(() => {
        navigation.navigate('AccountHome', { account });
        alert(`Card added successfully!`);
      })
      .catch((error) => {
        console.error('Add Loyalty Card error:', error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        {isScannerVisible ? (
            <CameraView
                style={styles.camera}
                onBarcodeScanned={handleBarcodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: [
                    'ean13',
                    'ean8',
                    'upc_a',
                    'code128',
                    ],
                }}
                >
                <View style={styles.barcodeFrame}></View>
            </CameraView>
        ) : (
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Add Loyalty Card
          </Text>
          <View style={styles.cardImageContainer}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/loyaltycards.png')}
            />
          </View>
          <TouchableOpacity style={styles.scanButton} onPress={() => setIsScannerVisible(true)}>
            <MaterialCommunityIcons name="credit-card-scan" size={20} color="#ffffff" />
            <Text style={styles.scanButtonText}>Scan to Add Card</Text>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleCardNumberChange}
              value={cardNumber}
              placeholder="Card Number"
              keyboardType="numeric"
              maxLength={16}
              placeholderTextColor="#ffffff"
            />
            <MaterialCommunityIcons name="credit-card" size={20} color="#ffffff" style={styles.icon} />
          </View>
          <View style={styles.row}>
            <View style={[styles.smallInputContainer , expiryDateError && styles.errorOutline]}>
              <TextInput
                style={styles.smallInput}
                onChangeText={handleExpiryMonth}
                value={expiryMonth}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#ffffff"
                onBlur={() => {
                  if (expiryMonth.length === 1 && parseInt(expiryMonth, 10) >= 1) {
                    setExpiryMonth(`0${expiryMonth}`);
                  }
                }}
              />
              <MaterialCommunityIcons name="calendar-range-outline" size={20} color="#ffffff" style={styles.icon} />
            </View>
            <Text style={styles.separator}>/</Text>
            <View style={[styles.smallInputContainer , expiryDateError && styles.errorOutline]}>
              <TextInput
                ref={expiryYearRef}
                style={styles.smallInput}
                onChangeText={handleExpiryDate}
                value={expiryYear}
                placeholder="YY"
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#ffffff"
              />

              {expiryDateError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Expiry Date', 'Please enter a valid Expiry Date.\nValid Expiry Dates are in the form MM/YY')}
                  color="red"
                  style={styles.errorIcon}
                  size={25} />

              )}
              <MaterialCommunityIcons name="calendar-month" size={20} color="#ffffff" style={styles.icon} />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleMemberNameChange}
              value={memberName}
              placeholder="Member Name"
              placeholderTextColor="#ffffff"
            />
            <MaterialCommunityIcons name="information-outline" size={20} color="#ffffff" style={styles.icon} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddLoyaltyCard()}>
              <Text style={styles.addCardbuttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel    </Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#ffffff',
    borderColor: '#94dbdc',
    borderRadius: 30,
    borderWidth: 2,
    marginBottom: 10 * scale,
    paddingHorizontal: 40 * scale,
    paddingVertical: 10,
  },
  addCardbuttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  permsbuttonContainer: {
    alignSelf: "center",
    width: "50%",
    marginTop: 70
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 5 * scale,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    paddingHorizontal: 40 * scale,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cardImage: {
    height: height * 0.145,
    resizeMode: 'contain',
  },
  cardImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  dividerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20 * scale,
  },
  dividerLine: {
    backgroundColor: 'transparent',
    borderColor: '#ffffff',
    borderStyle: 'dashed',
    borderWidth: 1,
    flex: 1,
    height: 1,
    marginHorizontal: 12 * scale,
  },
  dividerText: {
    color: '#ffffff',
  },
  icon: {
    width: 25,
  },
  input: {
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#6a6188',
    borderColor: '#42537b',
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'row',
    marginBottom: 10 * scale,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: (width + 100) * 0.55,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: (width + 100) * 0.565,
  },
  safeArea: {
    backgroundColor: '#0f003f',
    flex: 1,
  },
  scanButton: {
    alignItems: 'center',
    backgroundColor: '#0f003f',
    borderColor: '#4dbeb5',
    borderRadius: 5,
    borderWidth: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15 * scale,
    paddingHorizontal: 10 * scale,
    paddingVertical: 5 * scale,
  },
  scanButtonText: {
    color: '#ffffff',
    marginLeft: 10,
  },
  separator: {
    color: '#ffffff',
    fontSize: 30,
  },
  smallInput: {
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  smallInputContainer: {
    alignItems: 'center',
    backgroundColor: '#6a6188',
    borderColor: '#42537b',
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'row',
    flex: 1,
    marginBottom: 5 * scale,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 25 * scale,
    fontWeight: 'bold',
    marginBottom: 10 * scale,
    marginTop: 5 * scale,
    textAlign: 'center',
  },
  errorOutline: {
    borderColor: 'red',
    borderWidth: 2
  },
  errorIcon: {
    position: 'relative',
    right: -75
  },
  barcodeFrame: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    height: 200,
    width: 300,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddLoyaltyCardScreen;
