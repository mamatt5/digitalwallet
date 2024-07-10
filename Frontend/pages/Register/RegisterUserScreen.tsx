import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, KeyboardAvoidingView, Alert,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { registerAccount } from '../../api/api';
import { getAccountFromEmail } from '../../api/api';
import { mobileExist } from '../../api/api';

function RegisterUserScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

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

  const handleFirstNameChange = (event) => {
    setFirstName(event)
    setFirstNameError(false)
  }

  const handleLastNameChange = (event) => {
    setLastName(event)
    setLastNameError(false)
  }

  const handleRegistration = async () => {
    // Values of regex need to be saved as react states(line 18 - 23) are one state behind

    const newEmailError = email === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);


    // needs 10 digits
    const newPhoneNumberError = phoneNumber === '' || !/^\d{10}$/.test(phoneNumber);

    // needs one number and one capital letter
    const newPasswordError = password === '' || !/(?=.*[0-9])(?=.*[A-Z]).+/.test(password);

    // only alpha-numeric and white spaces allowed
    const newFirstNameError = firstName === '' || !/^[a-zA-Z\s]*$/.test(firstName);
    const newLastNameError = lastName === '' || !/^[a-zA-Z\s]*$/.test(lastName);

    let doesEmailExist = false
    let doesMobileExist = false
    if (newEmailError) {
      setEmailError(true);
    } else {
    
      doesEmailExist = await getAccountFromEmail(email.toLocaleLowerCase())
      
      if (doesEmailExist) {
        setEmailError(true)
      } else {
        setEmailError(false)
      }
      
    }

    if (newPhoneNumberError) {
      setMobileError(true);
    } else {
      
      doesMobileExist = (await mobileExist(phoneNumber)).data
      
      if (doesMobileExist) {
        setMobileError(true)
      } else {
        setMobileError(false)
      }
    }

    setPasswordError(newPasswordError);
    setFirstNameError(newFirstNameError);
    setLastNameError(newLastNameError);
    console.log(" ----")
    console.log(email)
    console.log(password)
    console.log(phoneNumber)
    console.log(firstName)
    console.log(lastName)
    console.log(" ----")
    if (!newEmailError && !newPhoneNumberError && !newPasswordError && !newFirstNameError && !newLastNameError && !doesMobileExist && !doesEmailExist) {
      registerAccount(email.toLocaleLowerCase(), password, phoneNumber, 'user', '', '', firstName, lastName)
        .then(navigation.navigate('RegisterSucessful')).catch((error) => console.error('Registration error:', error));
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={120}>

        <ScrollView>
          <View style={styles.centerView}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              Register User
            </Text>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="FIRSTNAME"
                  onChangeText={(e)=>handleFirstNameChange(e)}
                  value={firstName}
                  error={firstNameError}
                />
              </View>

              {firstNameError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Firstname', 'Please enter a valid first name.\nOnly letters and white spaces allowed')}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}

            </View>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="LASTNAME"
                  onChangeText={(e)=>handleLastNameChange(e)}
                  value={lastName}
                  error={lastNameError}
                />
              </View>

              {lastNameError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Lastname', 'Please enter a valid last name.\nOnly letters and white spaces allowed')}
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
                  keyboardType='email-address'
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
                  maxLength={10}
                  keyboardType='phone-pad'
                />
              </View>

              {mobileError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert('Invalid Mobile Number', 'Please enter a valid mobile numbner')}
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
              <Button buttonColor="#ffffff" textColor="#000000" onPress={handleRegistration}>
                <Text style={{ fontWeight: 'bold' }}>
                  Sign Up
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
    flexDirection: 'row', 
    alignItems: 'center', 
    position: 'relative', 
  },

  errorIcon: {
    position: 'absolute', 
    right: -20, 
  },
  eyeIcon: {
    position: 'absolute', 
    right: 20, 
    opacity: 0.6,

  },
  centerView: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: "center"
  },
  buttonContainer: {
    margin: 20,
    width: 200,
  },
});

export default RegisterUserScreen;
