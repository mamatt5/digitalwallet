import React from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Alert } from 'react-native'
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Button } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { updatePassword } from '../../api/api';

const ResetPasswordScreen = ({ route, navigation }) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationCodeError, setVerificationCodeError] = useState(false)

  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)


  const email = route.params?.email
  const code = route.params?.code

  const resetPassword = async () => {

    if (verificationCode !== code) {
      setVerificationCodeError(true)
    } else {
      setVerificationCodeError(false)
    }
    const newPasswordError = password === '' || !/(?=.*[0-9])(?=.*[A-Z]).+/.test(password);
    setPasswordError(newPasswordError);
    if (!newPasswordError && !verificationCodeError) {
      updatePassword(email, password).then(navigation.navigate('ResetPasswordSuccessful')).catch((error) => console.error('Reset Password error:', error));
    }

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
                onPress={() => Alert.alert("Invalid Verification Code", "Please try again")}
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

            {passwordError && (
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
    flexDirection: 'row', 
    alignItems: 'center', 
    position: 'relative', 
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
    position: 'absolute', 
    right: -20, 
  },
});


export default ResetPasswordScreen;
