import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Login from './pages/Login/LoginScreen'

const { Navigator, Screen } = createStackNavigator();

const App = (props: any) => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        <Screen name='Login' component={Login}></Screen>
      </Navigator>
    </NavigationContainer>
  );
}

export default App;