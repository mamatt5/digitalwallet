import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../pages/Login/LoginScreen';
import RegisterUserScreen from '../pages/Register/RegisterUserScreen';
import ForgotPasswordScreen from '../pages/ForgotPassword/ForgotPasswordScreen';
import RegisterOptionScreen from '../pages/Register/RegisterOptionScreen';
import RegisterMerchantScreen from '../pages/Register/RegisterMerchantScreen';
import ResetPasswordScreen from '../pages/ForgotPassword/ResetPasswordScreen';
import RegisterSucessScreen from '../pages/Register/RegisterSucessScreen';
import ResetPasswordSuccessfulScreen from '../pages/ForgotPassword/ResetPasswordSuccessfulScreen';
import RewardsScreen from '../pages/Rewards/RewardsScreent';

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitle: ' ',
        headerStyle: {
          backgroundColor: '#0f003f',
        },
        headerTintColor: '#fff',
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="RegisterUser" component={RegisterUserScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="RegisterOption" component={RegisterOptionScreen} />
      <AuthStack.Screen name="RegisterMerchant" component={RegisterMerchantScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <AuthStack.Screen name="RegisterSucessful" component={RegisterSucessScreen} />
      <AuthStack.Screen name="ResetPasswordSuccessful" component={ResetPasswordSuccessfulScreen} />

    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
