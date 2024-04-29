import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/Login/LoginScreen';
import RegisterUserScreen from './pages/Register/RegisterUserScreen';
import ForgotPasswordScreen from './pages/ForgotPassword/ForgotPasswordScreen';
import QRScanScreen from './pages/QRScan/QRScanScreen';
import AccountScreen from './pages/Account/AccountScreen';
import RegisterOptionScreen from './pages/Register/RegisterOptionScreen';
import RegisterMerchantScreen from './pages/Register/RegisterMerchantScreen';
import AddCardScreen from './pages/Cards/AddCardScreen';
import GenerateQRScreenMerchant from './pages/GenerateQR/GenerateQRMerchantScreen';
import GenerateQRScreenUser from './pages/GenerateQR/GenerateQRUserScreen';

const { Navigator, Screen } = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        <Screen name="Login" component={LoginScreen} />
        <Screen name="RegisterUser" component={RegisterUserScreen} />
        <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Screen name="QRScan" component={QRScanScreen} />
        <Screen name="GenerateQRMerchant" component={GenerateQRScreenMerchant} />
        <Screen name="GenerateQRUser" component={GenerateQRScreenUser} />
        <Screen name="Account" component={AccountScreen} />
        <Screen name="RegisterOption" component={RegisterOptionScreen} />
        <Screen name="RegisterMerchant" component={RegisterMerchantScreen} />
        <Screen name="AddCard" component={AddCardScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
