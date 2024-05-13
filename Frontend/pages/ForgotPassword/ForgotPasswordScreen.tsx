<<<<<<< HEAD
import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { useState } from "react";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getAccountFromEmail } from "../../api/api";
import email from 'react-native-email';
import APPlogo from "../../assets/APPlogo.png";
import { sendEmail } from "../../api/sendEmail";
import random from 'random-string-generator'


const ForgotPasswordScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState("")
  const [emailError, setEmailError] = useState(false);

  const handleEmail = async(address: string, body: string, subject: string) => {

    // sendEmail doesn't work atm the moment
    // look inside sendEmail.ts for more information
    // sendEmail(address, "s", "s")
  
  }



  const sendVerification = async () => {
    const newEmailError = emailAddress === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailAddress);
    
    if (newEmailError) {
      setEmailError(newEmailError);
    } else {
      setEmailError(false);

      // API works
      // atm frontend aint working so can't test it
      // not sure if this works
      const resp = getAccountFromEmail(emailAddress)
  
      

      if (resp) {
        // meant to send verification code (not working atm)
        const code = random(6)
        console.log(code)
        handleEmail("jahwmgrfsfavvkmvml@cazlp.com", "s", "s")
        navigation.navigate("ResetPassword", {email: emailAddress, code: code})

      }
      
      
      
    }

  }

=======
import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
>>>>>>> origin/develop

function ForgotPasswordScreen({ navigation }) {
  return (
<<<<<<< HEAD
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>

        <Image source={APPlogo} style={styles.APPlogo} />

        <View style={styles.centerView}>
          <Text style={styles.titleText}>
            {'Forgot Password'}
          </Text>
          <Text style={styles.verificationText}>
            Enter you email and we will send a verifcation code.
          </Text>
          <View style={styles.container}>
            <View>
              <DynamicTextInput
                placeholder="EMAIL"
                onChangeText={setEmailAddress}
                value={emailAddress}
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


          <View style={styles.buttonContainer}>
            <Button buttonColor="#ffffff" textColor="#000000" onPress={sendVerification}>
              <Text style={{ fontWeight: "bold" }}>
                Send Verification
              </Text>
            </Button>
          </View>
          <Text onPress={() => navigation.navigate('Login')} style={styles.linkText}>
            Back
          </Text>
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  APPlogo: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50
  },
  container: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align items vertically
    position: 'relative', // Required for absolute positioning
  },
  centerView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center"
  },
  titleText: {
    color: '#ffffff',
    fontSize: 40,
    margin: 30
  },
  buttonContainer: {
    margin: 20,
    width: 200
  },
  linkText: {
    color: '#ffffff',
    marginTop: 20
  },
  verificationText: {
    color: '#ffffff',
    marginBottom: 40
  },
  errorIcon: {
    position: 'absolute', // Position the icon absolutely
    right: -20, // Adjust the position as needed
  },
});

export default ForgotPasswordScreen;
=======
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <ScrollView>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: 30, margin: 30 }}>
            Forgot Password
          </Text>
          <DynamicTextInput placeholder="EMAIL" value="" />
          <DynamicTextInput placeholder="PASSWORD" value="" />
          <View style={{ margin: 20, width: 200 }}>
            <Button buttonColor="#ffffff" textColor="#000000">
              <Text style={{ fontWeight: 'bold' }}>
                Log In
              </Text>
            </Button>
          </View>
          <Text onPress={() => navigation.navigate('Login')} style={{ color: '#ffffff', marginTop: 20 }}>
            Log In
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen;
>>>>>>> origin/develop
