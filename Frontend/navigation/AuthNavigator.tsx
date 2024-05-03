import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/Login/LoginScreen';
import RegisterUserScreen from '../pages/Register/RegisterUserScreen';
import ForgotPasswordScreen from '../pages/ForgotPassword/ForgotPasswordScreen';
import RegisterOptionScreen from '../pages/Register/RegisterOptionScreen';
import RegisterMerchantScreen from '../pages/Register/RegisterMerchantScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="RegisterOption" component={RegisterOptionScreen} />
      <Stack.Screen name="RegisterMerchant" component={RegisterMerchantScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;