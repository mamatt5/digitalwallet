import React, { useEffect, useRef, useState } from 'react';
import {
  Button, SafeAreaView, Text, TextInput, View, StyleSheet, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { addCard } from '../../api/api';

function AddCardScreen({ navigation, route }) {
  const { account, fetchCards } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

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

  const handleAddCard = () => {
    addCard(cardNumber, expiryDate, cardCVV, account.wallet.wallet_id)
      .then(() => {
        fetchCards();
        navigation.navigate('Account', { account });
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
              <TextInput
                style={styles.input}
                onChangeText={setCardNumber}
                value={cardNumber}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={16}
                keyboardType="numeric"
              />

              <Text style={styles.labelText}>
                Expiry date:
              </Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.smallInput}
                  onChangeText={setExpiryMonth}
                  value={expiryMonth}
                  placeholder="MM"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.separator}>/</Text>
                <TextInput
                  ref={expiryYearRef}
                  style={styles.smallInput}
                  onChangeText={setExpiryYear}
                  value={expiryYear}
                  placeholder="YY"
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>

              <View>
                <Text style={styles.labelText}>
                  CVV:
                </Text>
                <TextInput
                  style={styles.smallInput}
                  onChangeText={setCardCVV}
                  value={cardCVV}
                  placeholder="XXX"
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Add card"
                onPress={() => handleAddCard()}
              />
            </View>

          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    width: 200,
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
});

export default AddCardScreen;
