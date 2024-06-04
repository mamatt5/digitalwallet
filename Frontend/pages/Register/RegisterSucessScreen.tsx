import React from 'react';

import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function RegisterSucessScreen({ navigation }) {

  const goToLogin = () => {
    navigation.navigate('Login');
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        
        <Text style={styles.titleText}>
            <Text style={[styles.titleText, {textAlign: 'center'}]}>Registration</Text>{'\n'}
            <Text style={[styles.titleText, {textAlign: 'center'}]}> Successful</Text>
        </Text>
        

        <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkText}>
            You have successfully created an account.
        </Text>

        <View style={styles.buttonContainer}>
            <Button buttonColor="#ffffff" textColor="#000000" onPress={goToLogin}>
              <Text style={{fontWeight:"bold"}}>
                Log In
              </Text>
            </Button>
          </View>

      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  APPlogo: {
    width: 200, 
    height: 200, 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    marginTop: 50
  },
  container: {
    backgroundColor: '#0f003f', 
    height: 2000
  },
  centerView: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: "center"
  },
  titleText: {
    color: '#ffffff', 
    fontSize: 40, 
    margin: 30,
  },
  buttonContainer: {
    margin: 20,
    width: 200,
  },

  linkText: {
    color: '#ffffff',
    marginTop: 20,
  },

});


export default RegisterSucessScreen;