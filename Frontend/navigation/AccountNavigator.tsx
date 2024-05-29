import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../pages/Account/AccountScreen';
import AddCardScreen from '../pages/Cards/AddCardScreen';
import PaymentScreen from '../pages/QRPayment/PaymentScreen';
import PaymentComplete from '../pages/QRPayment/PaymentComplete';
import QRGenerateScreenMerchant from '../pages/GenerateQR/GenerateQRMerchantScreen';
import AddLoyaltyCardScreen from '../pages/Cards/AddLoyaltyCardScreen';

const AccountStack = createStackNavigator();

function AuthNavigator({ route }) {
  const { account } = route.params;
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f003f',
        },
        headerTintColor: '#fff',
        headerTitle: ' ',
      }}
    >
      <AccountStack.Screen
        name="AccountHome"
        component={AccountScreen}
        initialParams={{ account }}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="AddCard"
        component={AddCardScreen}
      />
      <AccountStack.Screen
        name="AddLoyaltyCard"
        component={AddLoyaltyCardScreen}
      />
      <AccountStack.Screen
        name="QRPayment"
        component={PaymentScreen}
      />
      <AccountStack.Screen
        name="PaymentComplete"
        component={PaymentComplete}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="QRGenerateScreenMerchant"
        component={QRGenerateScreenMerchant}
      />
    </AccountStack.Navigator>
  );
}

export default AuthNavigator;
