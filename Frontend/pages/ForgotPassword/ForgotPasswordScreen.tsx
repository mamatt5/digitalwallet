import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { useState } from "react";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getAccountFromEmail } from "../../api/api";
import Genericlogo from '../../assets/Genericlogo.png';
import { sendEmail } from "../../api/sendEmail";


function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const ForgotPasswordScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState("")
  const [emailError, setEmailError] = useState(false);



  const sendVerification = async () => {
    const newEmailError = emailAddress === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailAddress);
    
    if (newEmailError) {
      setEmailError(newEmailError);
    } else {
      setEmailError(false);

      const resp = getAccountFromEmail(emailAddress)

      if (resp) {
        const code = makeid(6)
        // verifcation code is always sent as 1 just to make life easier for demo and testing
        navigation.navigate('ResetPassword', {email: emailAddress, code: "1"})

      }
      
      
      
    }

  }

  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>

        <Image source={Genericlogo} style={styles.APPlogo} />

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
