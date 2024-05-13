import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
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
import ResetPasswordScreen from './pages/ForgotPassword/ResetPasswordScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f003f" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        <Screen name='Login' component={LoginScreen}></Screen>
        <Screen name='RegisterUser' component={RegisterUserScreen}></Screen>
        <Screen name='ForgotPassword' component={ForgotPasswordScreen}></Screen>
        <Screen name='QRScan' component={QRScanScreen}></Screen>
        <Screen name='Account' component={AccountScreen}></Screen>
        <Screen name='RegisterOption' component={RegisterOptionScreen}></Screen>
        <Screen name='RegisterMerchant' component={RegisterMerchantScreen}></Screen>
        <Screen name='AddCard' component={AddCardScreen}></Screen>
        <Screen name='ResetPassword' component={ResetPasswordScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
