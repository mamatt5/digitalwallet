import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import QRScanScreen from '../pages/QRScan/QRScanScreen';
import ReceiptsScreen from '../pages/Receipts/ReceiptsScreen';
import OverviewScreen from '../pages/Overview/OverviewScreen';
import AccountNavigator from './AccountNavigator';
import QRGenerateNavigator from './QRGenerateNavigator';

const Tab = createBottomTabNavigator();

function MainNavigator({ route }) {
  const { account } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
        }
      }}
    >
      <Tab.Screen
        name="Scan QR"
        component={QRScanScreen}
        initialParams={{ account }}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Generate QR"
        component={QRGenerateNavigator}
        initialParams={{ account }}
        options={{
          tabBarLabel: 'Generate',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        initialParams={{ account }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          tabBarLabel: 'Overview',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-arc" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Receipts"
        component={ReceiptsScreen}
        options={{
          tabBarLabel: 'Receipts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="receipt" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;
