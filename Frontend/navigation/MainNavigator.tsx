import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '../pages/Account/AccountScreen';
import QRScanScreen from '../pages/QRScan/QRScanScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReceiptScreen from '../pages/Receipt/ReceiptScreen';
import OverviewScreen from '../pages/Overview/OverviewScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = ({route}) => {
    const { account } = route.params;
    return (
      <Tab.Navigator
        initialRouteName="Account"
        screenOptions={{
            headerShown: false
        }}
      >
        <Tab.Screen
          name="Scan QR"
          component={QRScanScreen}
          options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Generate QR"
          component={QRScanScreen}
          options={{
            tabBarLabel: 'Generate',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="qrcode-plus" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          initialParams={{ account: account }}
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
          name="Receipt"
          component={ReceiptScreen}
          options={{
            tabBarLabel: 'Receipts',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="receipt" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  
  export default MainNavigator;