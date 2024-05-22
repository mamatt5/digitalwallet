import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, StyleSheet, Image,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { loginUser } from '../../api/api';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Genericlogo from '../../assets/Genericlogo.png';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showFullPass, setShowFullPass] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event)
    setEmailError(false)
  }

  const handlePasswordChange = (event) => {
    setPassword(event)
    setPasswordError(false)
  }

  const handleLogin = async () => {

    const newEmailError = email === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const newPasswordError = password === '' || !/(?=.*[0-9])(?=.*[A-Z]).+/.test(password);


    if (newEmailError) {
      setEmailError(true);
    }

    if (newPasswordError) {
      setPasswordError(true);
    }

    if (newEmailError || newPasswordError) {
      return;
    }

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
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <Image source={Genericlogo} style={styles.APPlogo} />
      <ScrollView>
        <View style={styles.centerView}>
          <Text style={{ color: '#ffffff', fontSize: 30, margin: 30 }}>
            {'Log in'}
          </Text>

          <View style={styles.container}>
         
            <View>
              <DynamicTextInput placeholder="EMAIL" onChangeText={(e)=>handleEmailChange(e)} value={email} error={emailError} />
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
              <DynamicTextInput placeholder="PASSWORD" onChangeText={handlePasswordChange} value={password} error={passwordError} secureTextEntry={showFullPass} />
            </View>
            
            <Ionicons name={showFullPass ? "eye" : "eye-off"} size={25} color="#fff" onPress={() => setShowFullPass(!showFullPass)} style={styles.eyeButton}/>
         

            {passwordError && (
              <MaterialIcons
                name="error-outline"
                onPress={() => Alert.alert('Invalid password', 'Please enter a valid password')}
                color="red"
                style={styles.errorIcon}
                size={25}
              />
            )}
          </View>
        
            <Button buttonColor="#ffffff" textColor="#000000" onPress={handleLogin} style={styles.buttonContainer}>
              <Text>
                Log In
              </Text>
            </Button>
          
          <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkText}>
            Forgot Password
          </Text>
          <Text onPress={() => navigation.navigate('RegisterOption')} style={styles.linkText}>
            Sign Up
          </Text>
          

        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: 200,
    marginTop: 10
  },

  linkText: {
    color: '#ffffff',
    marginTop: 20,
  },
  errorIcon: {
    position: 'absolute', // Position the icon absolutely
    right: -20, // Adjust the position as needed
  },
  eyeButton: {
    position: 'absolute', // Position the icon absolutely
    right: 25, // Adjust the position as needed
    opacity: 0.6,
  }
  

});

export default LoginScreen;
