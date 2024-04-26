import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './pages/Login/LoginScreen'
import RegisterUserScreen from './pages/Register/RegisterUserScreen'
import ForgotPasswordScreen from './pages/ForgotPassword/ForgotPasswordScreen';
import QRScanScreen from './pages/QRScan/QRScanScreen';
import AccountScreen from './pages/Account/AccountScreen';
import RegisterOptionScreen from './pages/Register/RegisterOptionScreen';
import RegisterMerchantScreen from './pages/Register/RegisterMerchantScreen';
import AddCardScreen from './pages/Cards/AddCardScreen';
import QRGenerateScreenMerchant from './pages/QRGenerate/QRGenerateScreenMerchant';

const { Navigator, Screen } = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        <Screen name='Login' component={LoginScreen}></Screen>
        <Screen name='RegisterUser' component={RegisterUserScreen}></Screen>
        <Screen name='ForgotPassword' component={ForgotPasswordScreen}></Screen>
        <Screen name='QRScan' component={QRScanScreen}></Screen>
        <Screen name='QRGenerateMerchant' component={QRGenerateScreenMerchant}></Screen>
        <Screen name='Account' component={AccountScreen}></Screen>
        <Screen name='RegisterOption' component={RegisterOptionScreen}></Screen>
        <Screen name='RegisterMerchant' component={RegisterMerchantScreen}></Screen>
        <Screen name='AddCard' component={AddCardScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
}

export default App;