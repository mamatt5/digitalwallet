/* eslint-disable react/prop-types */
import React from 'react';

import { View, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

function RegisterOptionScreen({ navigation }) {
  const registerUser = () => {
    navigation.navigate('RegisterUser');
  };

  const registerMerchant = () => {
    navigation.navigate('RegisterMerchant');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
          Account Type
        </Text>

        <View style={{ margin: 20, width: 200 }}>
          <Button buttonColor="#ffffff" textColor="#000000" onPress={registerUser}>
            <Text style={{ fontWeight: 'bold' }}>
              User
            </Text>
          </Button>
        </View>

        <View style={{ margin: 20, width: 200 }}>
          <Button buttonColor="#ffffff" textColor="#000000" onPress={registerMerchant}>
            <Text style={{ fontWeight: 'bold' }}>
              Merchant
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>

  );
}

export default RegisterOptionScreen;
