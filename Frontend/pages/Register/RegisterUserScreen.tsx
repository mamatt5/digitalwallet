import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";

import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { registerAccount } from "../../api/api";
import { StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const RegisterUserScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("user");

  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const [hidePass, setHidePass] = useState(true);



  const handleRegistration = async () => {

      

      setEmailError(email === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email));

      // needs 10 digits
      setMobileError(phoneNumber === '' || !/^\d{10}$/.test(phoneNumber));

      // needs one number and one capital letter
      setPasswordError(password === '' || !/(?=.*[0-9])(?=.*[A-Z]).+/.test(password))

      // only alpha-numeric and white spaces allowed
      setFirstNameError(firstName === '' || !/^[a-zA-Z\s]*$/.test(firstName))
      setLastNameError(lastName === '' || !/^[a-zA-Z\s]*$/.test(firstName))



    try {
      await registerAccount(email, password, phoneNumber, "user", "", "", firstName, lastName)
      // Snackbar.show({
      //   text: 'User Created',
      //   duration: Snackbar.LENGTH_SHORT,
      // });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };


  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
      <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              {'Register User'}
            </Text>



            <View style={styles.container}>
                        <View>
                          <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} />
                        </View>
                        {emailError && (
                            <MaterialIcons
                            name="error-outline"
                            onPress={() => alert("Please enter a valid email")}
                            color="red"
                            style={styles.errorIcon}
                            size = {25}
                            />
                        )}
        
            </View>

            <View style={styles.container}>
                        <View>
                          <DynamicTextInput placeholder="MOBILE NUMBER" onChangeText={setPhoneNumber} value={phoneNumber} />
                        </View>
                        {mobileError && (
                            <MaterialIcons
                            name="error-outline"
                            onPress={() => alert("Please enter a valid mobile numbner")}
                            color="red"
                            style={styles.errorIcon}
                            size = {25}
                            />
                        )}
        
            </View>

            <View style={styles.container}>
                        <View>
                          <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry={hidePass} />
                        </View>

                        <Ionicons
                                name="eye"
                                style={styles.eyeIcon}
                                size = {25}
                                onPress={()=>setHidePass(!hidePass)}
                                />
                        {passwordError && (
                            <MaterialIcons
                            name="error-outline"
                            onPress={() => alert("Please enter a valid password.\n At least one number and capital letter required")}
                            color="red"
                            style={styles.errorIcon}
                            size = {25}
                            />
                        )}
        
            </View>

            <View style={styles.container}>
                        <View>
                          <DynamicTextInput placeholder="FIRSTNAME" onChangeText={setFirstName} value={firstName} />
                        </View>
                        {firstNameError && (
                            <MaterialIcons
                            name="error-outline"
                            onPress={() => alert("Please enter a valid first name.\n Only letters and white spaces allowed")}
                            color="red"
                            style={styles.errorIcon}
                            size = {25}
                            />
                        )}
        
            </View>
            

            <View style={styles.container}>
                        <View>
                          <DynamicTextInput placeholder="LASTNAME" onChangeText={setLastName} value={lastName} />
                        </View>
                        {lastNameError && (
                            <MaterialIcons
                            name="error-outline"
                            onPress={() => alert("Please enter a valid last name.\n Only letters and white spaces allowed")}
                            color="red"
                            style={styles.errorIcon}
                            size = {25}
                            />
                        )}
        
            </View>
            
            
           
           
            
            

            <View style={{ margin:20, width:200}}>
              <Button buttonColor="#ffffff" textColor="#000000" onPress={handleRegistration}>
                  <Text style={{fontWeight:"bold"}}>
                    Sign Up
                  </Text>
                </Button>
            </View>
            <Text style={{ color:'#ffffff', marginTop: 20}} onPress={() => navigation.navigate('Login')}>
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
  inputContainer: {
    flex: 1, // Take up remaining space
  },
  errorIcon: {
    position: 'absolute', // Position the icon absolutely
    right: -20, // Adjust the position as needed
  },
  eyeIcon: {
    position: 'absolute', // Position the icon absolutely
    right: 20, // Adjust the position as needed
    opacity:0.6,

  }
});


export default RegisterUserScreen;