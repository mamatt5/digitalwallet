import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { registerAccount } from '../../api/api';

function RegisterMerchantScreen({ navigation }) {
  const [companyName, setCompanyName] = useState('');
  const [abn, setAbn] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [companyNameError, setCompanyNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [abnError, setAbnError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  const [hidePass, setHidePass] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event)
    setEmailError(false)
  }

  const handleMobileChange = (event) => {
    setPhoneNumber(event)
    setMobileError(false)
  }

  const handlePasswordChange = (event) => {
    setPassword(event)
    setPasswordError(false)
  }

  const handleAbnChange = (event) => {
    setAbn(event)
    setAbnError(false)
  }

  const handleCompanyNameChange = (event) => {
    setCompanyName(event)
    setCompanyNameError(false)
  }


  const createMerchant = async () => {
    // Values of regex need to be saved as react states(line 20 - 25) are one state behind

    const newCompanyNameError = (companyName === '');
    const newEmailError = email === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // 11 digits
    // can be enter with or without white spaces
    const newAbnError = abn === '' || !/^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(abn);

    // needs 10 digits
    const newPhoneNumberError = phoneNumber === '' || !/^\d{10}$/.test(phoneNumber);

    // needs one number and one capital letter
    const newPasswordError = password === '' || !/(?=.*[0-9])(?=.*[A-Z]).+/.test(password);

    setCompanyNameError(newCompanyNameError);
    setEmailError(newEmailError);
    setAbnError(newAbnError);
    setMobileError(newPhoneNumberError);
    setPasswordError(newPasswordError);

    if (!newEmailError && !newPhoneNumberError && !newPasswordError && !newCompanyNameError && !newAbnError) {
      registerAccount(email, password, phoneNumber, 'merchant', companyName, abn, '', '')
        .then(navigation.navigate('RegisterSucessful')).catch((error) => console.error('Registration error:', error));
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={120}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              Register Merchant
            </Text>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="COMPANY NAME"
                  onChangeText={(e)=>handleCompanyNameChange(e)}
                  value={companyName}
                  error={companyNameError}
                />
              </View>
              {companyNameError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Company Name', 'Please enter a valid company name')}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}
            </View>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="ABN"
                  onChangeText={(e)=>handleAbnChange(e)}
                  value={abn}
                  error={abnError}
                />
              </View>
              {abnError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid ABN', 'Please enter a valid company ABN.\nA valid ABN consists of 11 digits.')}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}
            </View>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="EMAIL"
                  onChangeText={(e)=>handleEmailChange(e)}
                  value={email}
                  error={emailError}
                />
              </View>
              {emailError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Email', 'Please enter a valid email')}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}
            </View>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="MOBILE NUMBER"
                  onChangeText={(e)=>handleMobileChange(e)}
                  value={phoneNumber}
                  error={mobileError}
                />
              </View>
              {mobileError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Mobile Number', 'Please enter a valid mobile number')}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}
            </View>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="PASSWORD"
                  onChangeText={(e)=>handlePasswordChange(e)}
                  value={password}
                  secureTextEntry={hidePass}
                  error={passwordError}
                />
              </View>
              <Ionicons
                name={hidePass ? "eye" : "eye-off"}
                style={styles.eyeIcon}
                color="#fff"
                size={25}
                onPress={() => setHidePass(!hidePass)}
              />
              {passwordError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Password', 'Please enter a valid password.\nAt least one number and capital letter required')}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />

              )}

            </View>

            <View style={{ margin: 20, width: 200 }}>
              <Button buttonColor="#ffffff" textColor="#000000" onPress={createMerchant}>
                <Text style={{ fontWeight: 'bold' }}>
                  Register Merchant
                </Text>
              </Button>
            </View>
            <Text style={{ color: '#ffffff', marginTop: 20 }} onPress={() => navigation.navigate('Login')}>
              Already have an account
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align items vertically
    position: 'relative', // Required for absolute positioning
  },
  errorIcon: {
    position: 'absolute', // Position the icon absolutely
    right: -20, // Adjust the position as needed
  },
  eyeIcon: {
    position: 'absolute', // Position the icon absolutely
    right: 20, // Adjust the position as needed
    opacity: 0.6,

  },
});

export default RegisterMerchantScreen;
