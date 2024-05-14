import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../pages/Account/AccountScreen';
import AddCardScreen from '../pages/Cards/AddCardScreen';
import PaymentScreen from '../pages/QRPayment/PaymentScreen';
import PaymentComplete from '../pages/QRPayment/PaymentComplete';

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
        name="QRPayment"
        component={PaymentScreen}
      />
      <AccountStack.Screen
        name="PaymentComplete"
        component={PaymentComplete}
      />
    </AccountStack.Navigator>
  );
}

export default AuthNavigator;
