import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import QRGenerateMerchantScreen from '../pages/GenerateQR/GenerateQRMerchantScreen';
import GenerateGenericQR from '../pages/GenerateQR/GenerateGenericQR';

const QRGenerateStack = createStackNavigator();

function QRGenerateNavigator({ route }) {
  const { account } = route.params;

  return (
    <QRGenerateStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f003f',
        },
        headerTintColor: '#fff',
        headerTitle: ' ',
      }}
    >
      <QRGenerateStack.Screen
        name="GenerateQRUser"
        component={GenerateGenericQR}
        initialParams={{ account }}
        options={{ headerShown: false }}
      />
      <QRGenerateStack.Screen
        name="GenerateQRMerchant"
        component={QRGenerateMerchantScreen}
        initialParams={{ account }}
      />
    </QRGenerateStack.Navigator>
  );
}

export default QRGenerateNavigator;
