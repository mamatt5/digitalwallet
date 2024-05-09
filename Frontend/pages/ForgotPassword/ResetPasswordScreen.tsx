import React from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Alert } from 'react-native'
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Button } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { updatePassword } from '../../api/api';


// maybe pass the email of the user whos passwrod is being reset here?
const ResetPasswordScreen = ({ route, navigation }) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationCodeError, setVerificationCodeError] = useState(false)

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  

  const email = route.params?.email
  const code = route.params?.code

  const resetPassword = async () => {
    Alert.alert("inners")
    const resp = updatePassword(email, password)
    
  }


  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
        <View style={styles.centerView}>

          <Text style={styles.titleText}>
            {'Reset Password'}
          </Text>

          <Text style={styles.verificationText}>
            {'Please enter your verification Code \n        and your new Password'}
          </Text>


          <View style={styles.container}>
            <View>
              <DynamicTextInput
                placeholder="Verification Code"
                onChangeText={setVerificationCode}
                value={verificationCode}
                error={verificationCodeError} />
            </View>

            {verificationCodeError && (
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
                placeholder="New Password"
                onChangeText={setPassword}
                value={password}
                error={passwordError} />
            </View>

            {verificationCodeError && (
              <MaterialIcons
                name="error-outline"
                onPress={() => Alert.alert("Invalid Password", "Please enter a valid Password")}
                color="red"
                style={styles.errorIcon}
                size={25}
              />
            )}

          </View>


          <View style={styles.buttonContainer}>
            <Button buttonColor="#ffffff" textColor="#000000" onPress={resetPassword}>
              <Text style={{ fontWeight: "bold" }}>
                Reset Password
              </Text>
            </Button>
          </View>


        </View>


      </SafeAreaView>
    </ScrollView>
  )
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


export default ResetPasswordScreen;
