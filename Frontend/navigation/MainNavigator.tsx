import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import QRScanScreen from '../pages/QRScan/QRScanScreen';
import OverviewScreen from '../pages/Overview/OverviewScreen';
import AccountNavigator from './AccountNavigator';
import QRGenerateNavigator from './QRGenerateNavigator';
import ReceiptNavigator from './ReceiptNavigator';
import RewardsScreen from '../pages/Rewards/RewardsScreen';

const Tab = createBottomTabNavigator();

function MainNavigator({ route }) {
  const { account } = route.params;
  console.log("Account logged in: ", account)
  return (
    <Tab.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
        // tabBarStyle: {
        //   borderTopLeftRadius: 20,
        //   borderTopRightRadius: 20,
        //   bottom: -10,
        //   backgroundColor: '#0f003f',
        // }
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

      { account.account_type === 'merchant' ? (
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
        ) : (
          <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarLabel: 'Rewards',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="gift" color={color} size={size} />
            ),
          }}
        />
        )}

      <Tab.Screen
        name="Receipts"
        component={ReceiptNavigator}
        initialParams={{ account }}
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
