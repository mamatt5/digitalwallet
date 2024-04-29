import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, Button, SafeAreaView, Text, TextInput, View,
} from 'react-native';

function AddCardScreen({ navigation, route }) {
  const { account } = route.params;
  const [cardNumber, setCardNumber] = useState('');
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
    if (expiryMonth.length === 2 && expiryYear.length === 2) {
      setExpiryDate(`${expiryMonth}/${expiryYear}`);
    }
  }, [expiryMonth, expiryYear]);

  const scanCard = () => {};

  const handleAddCard = () => {
    Alert.alert(
      'Card added',
      `Card number: ${cardNumber}\nExpiry date: ${expiryDate}`,
      [
        {
          text: 'OK',
          onPress: () => { navigation.setParams({ account }); navigation.goBack(); },
        },

      ],
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', flex: 1 }}>
      <View style={{ alignSelf: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
          Enter card details
        </Text>

        <View>
          <View style={{ margin: 20, width: 200 }}>
            <Text style={{ color: '#ffffff', fontSize: 20, margin: 10 }}>
              Card number:
            </Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                padding: 10,
                borderRadius: 5,
              }}
              onChangeText={setCardNumber}
              value={cardNumber}
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={16}
              keyboardType="numeric"
            />

            <Text style={{ color: '#ffffff', fontSize: 20, margin: 10 }}>
              Expiry date:
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{
                  backgroundColor: '#ffffff',
                  padding: 10,
                  borderRadius: 5,
                  width: 50,
                }}
                onChangeText={setExpiryMonth}
                value={expiryMonth}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
              />
              <Text style={{ marginHorizontal: 10, color: '#ffffff' }}>/</Text>
              <TextInput
                ref={expiryYearRef}
                style={{
                  backgroundColor: '#ffffff',
                  padding: 10,
                  borderRadius: 5,
                  width: 50,
                }}
                onChangeText={setExpiryYear}
                value={expiryYear}
                placeholder="YY"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            {/* Modify logic later on when there is card object and access to database */}
            <View style={{ marginTop: 20 }}>
              <Button
                title="Add card"
                onPress={() => handleAddCard()}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Button title="Scan card" onPress={scanCard} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AddCardScreen;
