import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, StyleSheet, Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { loginUser } from '../../api/api';
import Genericlogo from '../../assets/Genericlogo.png';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      console.log(response);
      const { account } = response;
      console.log('Account data:', account);
      if (account) {
        navigation.navigate('Main', { account });
      } else {
        console.error('Account object is missing in response');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Genericlogo} style={styles.APPlogo} />
      <View style={styles.centerView}>
        <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} />
        <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry />
        <View style={styles.buttonContainer}>
          <Button buttonColor="#ffffff" textColor="#000000" onPress={handleLogin}>
            <Text style={{ fontWeight: 'bold' }}>
              Log In
            </Text>
          </Button>
        </View>
        <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkText}>
          Forgot Password
        </Text>
        <Text onPress={() => navigation.navigate('RegisterOption')} style={styles.linkText}>
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  APPlogo: {
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    width: 150,
  },
  buttonContainer: {
    margin: 20,
    width: 200,
  },
  centerView: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#0f003f',
    height: 2000,
  },
  linkText: {
    color: '#ffffff',
    marginTop: 20,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 40,
    margin: 30,
  },
});

export default LoginScreen;
