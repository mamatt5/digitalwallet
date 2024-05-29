import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, Text, TextInput, View, StyleSheet, Keyboard, TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { addCard } from '../../api/api';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

function AddCardScreen({ navigation, route }) {
  const { account, fetchCards } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const [cardNumberError, setCardNumberError] = useState(false)
  const [expiryDateError, setExpriyDateError] = useState(false)
  const [cvvError, setCvvError] = useState(false)

  const handleCardNumberChange = (event) => {
    setCardNumberError(false);
    setCardNumber(event)
  }

  const handleCvvChange = (event) => {
    setCvvError(false);
    setCardCVV(event)
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

  const handleAddCard = () => {


    const newCardNumberError = cardNumber === '' || !/^\d{16}$/.test(cardNumber)
    const newCvvError = cardCVV === '' || !/^\d{3}$/.test(cardCVV)


    if (newCardNumberError) {
      setCardNumberError(true)
    }

    if (newCvvError) {
      setCvvError(true)
    }

    const currentDate = new Date();
    const [month, year] = expiryDate.split('/');
    const inputDate = new Date(`20${year}`, parseInt(month, 10) - 1, 1); // Assuming all years are in 20XX forma
    const newExpiryDateError = expiryDate === '' || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)

    if (newExpiryDateError || inputDate <= currentDate) {
      setExpriyDateError(true)
    }


    if (newCardNumberError || newCvvError || newExpiryDateError || parseInt(expiryMonth, 10) < 1 || inputDate <= currentDate) {
      return;
    }

    addCard(cardNumber, expiryDate, cardCVV, account.wallet.wallet_id)
      .then(() => {
        navigation.navigate('AccountHome', { account });
      })
      .catch((error) => {
        console.error('Add Card error:', error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerView}>
          <Text style={styles.titleText}>
            Enter your card details
          </Text>

          <View>
            <View style={styles.cardDetails}>
              <Text style={styles.labelText}>
                Card number:
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, cardNumberError && styles.errorOutline]}
                  onChangeText={handleCardNumberChange}
                  value={cardNumber}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={16}
                  keyboardType="numeric"
                // onFocus={() => setCardNumber('')}
                />
                {cardNumberError && (
                  <MaterialIcons
                    name="error-outline"
                    onPress={() => Alert.alert('Invalid Card Number', 'Please enter a valid Card Number.\nValid Card Number contains 16 digits')}
                    color="red"
                    style={styles.errorIcon}
                    size={25}
                  />
                )}
              </View>

              <Text style={styles.labelText}>
                Expiry date:
              </Text>
              <View style={styles.inputContainer}>  
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, expiryDateError && styles.errorOutline]}
                    onChangeText={handleExpiryMonth}
                    value={expiryMonth}
                    placeholder="MM"
                    keyboardType="numeric"
                    maxLength={2}
                    onFocus={() => setExpiryMonth('')}
                    onBlur={() => {
                      if (expiryMonth.length === 1 && parseInt(expiryMonth, 10) >= 1) {
                        setExpiryMonth(`0${expiryMonth}`);
                      }
                    }}
                  />




                  <Text style={styles.separator}>/</Text>
                  <TextInput
                    ref={expiryYearRef}
                    style={[styles.input, expiryDateError && styles.errorOutline]}
                    onChangeText={handleExpiryDate}
                    value={expiryYear}
                    placeholder="YY"
                    keyboardType="numeric"
                    maxLength={2}
                    onFocus={() => setExpiryYear('')}
                  />
                </View>

                {expiryDateError && (
                  <MaterialIcons
                    name="error-outline"
                    onPress={() => Alert.alert('Invalid Expiry Date', 'Please enter a valid Expiry Date.\nValid Expiry Dates are in the form MM/YY')}
                    color="red"
                    style={styles.errorIcon}
                    size={25}
                  />
                )}
              </View>

              <View>
                <Text style={styles.labelText}>
                  CVV:
                </Text>
                <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.smallInput, cvvError && styles.errorOutline]}
                  onChangeText={handleCvvChange}
                  value={cardCVV}
                  placeholder="XXX"
                  keyboardType="numeric"
                  maxLength={3}
                // onFocus={() => setCardCVV('')}
                />


                {cvvError && (
                  <MaterialIcons
                    name="error-outline"
                    onPress={() => Alert.alert('Invalid CVV', 'Please enter a valid CVV.\nOnly numbers allowed.')}
                    color="red"
                    style={styles.errorIcon}
                    size={25}
                  />
                )}

              </View>
              </View>
            </View>

            <Button buttonColor="#ffffff" textColor="#000000" onPress={() => handleAddCard()} style={styles.buttonContainer}>
              <Text>
                Add Card
              </Text>
            </Button>

          </View>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    width: 150,
    marginTop: 50
  },
  cardDetails: {
    margin: 20,
    width: 200,
  },
  centerView: {
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
  },
  labelText: {
    color: '#ffffff',
    fontSize: 20,
    margin: 10,

  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    backgroundColor: '#0f003f',
    flex: 1,
  },
  separator: {
    color: '#ffffff',
    marginHorizontal: 10,
  },
  smallInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    width: 50,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
  },
  errorOutline: {
    borderColor: 'red', // Change border color to red when error occurs
    borderWidth: 2
  },

  errorIcon: {
    position: 'relative', // Position the icon absolutely
    right: -15, // Adjust the position as needed
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddCardScreen;
