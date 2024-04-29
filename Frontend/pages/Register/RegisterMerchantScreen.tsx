import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-paper';
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { registerAccount } from '../../api/api';

function RegisterMerchantScreen({ navigation }) {
  const [companyName, setCompanyName] = useState('');
  const [abn, setAbn] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const createMerchant = async () => {
    try {
      await registerAccount(email, password, phoneNumber, 'merchant', companyName, abn, '', '');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              Register Merchant
            </Text>

            <DynamicTextInput placeholder="COMPANY NAME" onChangeText={setCompanyName} value={companyName} />
            <DynamicTextInput placeholder="ABN" onChangeText={setAbn} value={abn} />
            <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} />
            <DynamicTextInput placeholder="MOBILE NUMBER" onChangeText={setPhoneNumber} value={phoneNumber} />
            <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry />

            <View style={{ margin: 20, width: 200 }}>
              <Button buttonColor="#ffffff" textColor="#000000" onPress={createMerchant}>
                <Text style={{ fontWeight: 'bold' }}>
                  Register Merchant
                </Text>
              </Button>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

export default RegisterMerchantScreen;
