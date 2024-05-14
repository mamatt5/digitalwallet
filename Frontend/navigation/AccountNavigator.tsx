import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../pages/Account/AccountScreen';
import AddCardScreen from '../pages/Cards/AddCardScreen';

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
    </AccountStack.Navigator>
  );
}

export default AuthNavigator;