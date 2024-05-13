import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, KeyboardAvoidingView, Alert } from "react-native";
import { Button } from "react-native-paper";

import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { registerAccount } from "../../api/api";
import { StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const RegisterUserScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [hidePass, setHidePass] = useState(true);


  const handleRegistration = async () => {

    // Values of regex need to be saved as react states(line 18 - 23) are one state behind

 
    const newEmailError = email === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // needs 10 digits
    const newPhoneNumberError = phoneNumber === '' || !/^\d{10}$/.test(phoneNumber)

    // needs one number and one capital letter
    const newPasswordError = password === '' || !/(?=.*[0-9])(?=.*[A-Z]).+/.test(password);

    // only alpha-numeric and white spaces allowed
    const newFirstNameError = firstName === '' || !/^[a-zA-Z\s]*$/.test(firstName);
    const newLastNameError = lastName === '' || !/^[a-zA-Z\s]*$/.test(lastName);


    setEmailError(newEmailError);
    setMobileError(newPhoneNumberError);
    setPasswordError(newPasswordError)
    setFirstNameError(newFirstNameError) 
    setLastNameError(newLastNameError)

    if (!newEmailError && !newPhoneNumberError && !newPasswordError && !newFirstNameError && !newLastNameError) {
      registerAccount(email, password, phoneNumber, "user", "", "", firstName, lastName)
      .then(navigation.navigate("Login")).catch((error) => console.error("Registration error:", error));
    } 

  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              Register User
            </Text>

            <View style={styles.container}>
              <View>
                <DynamicTextInput placeholder="EMAIL"
                  onChangeText={setEmail}
                  value={email}
                  error={emailError} />
              </View>

              {emailError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert("Invalid Email", "Please enter a valid email")}
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
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                  error={mobileError} />
              </View>

              {mobileError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert("Invalid Mobile Number", "Please enter a valid mobile numbner")}
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
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={hidePass}
                  error={passwordError} />

              </View>

              <Ionicons
                name="eye"
                style={styles.eyeIcon}
                size={25}
                onPress={() => setHidePass(!hidePass)}
              />

              {passwordError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert("Invalid Password", "Please enter a valid password.\nAt least one number and capital letter required")}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}

            </View>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="FIRSTNAME"
                  onChangeText={setFirstName}
                  value={firstName}
                  error={firstNameError} />
              </View>

              {firstNameError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert("Invalid Firstname", "Please enter a valid first name.\nOnly letters and white spaces allowed")}
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
                  onChangeText={setLastName}
                  value={lastName}
                  error={lastNameError} />
              </View>

              {lastNameError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() => Alert.alert("Invalid Lastname", "Please enter a valid last name.\nOnly letters and white spaces allowed")}
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}

            </View>

            <View style={{ margin: 20, width: 200 }}>
              <Button buttonColor="#ffffff" textColor="#000000" onPress={handleRegistration}>
                <Text style={{ fontWeight: "bold" }}>
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

  }
});


export default RegisterUserScreen;
