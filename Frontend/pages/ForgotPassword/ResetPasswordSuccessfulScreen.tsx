import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function ResetPasswordSuccessfulScreen({ navigation }) {

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
     

        <Text style={styles.titleText}>
            <Text style={[styles.titleText, {textAlign: 'center'}]}>Password Reset</Text>{'\n'}
            <Text style={[styles.titleText, {textAlign: 'center'}]}>     Successful</Text>
        </Text>

        <Text style={styles.linkText}>
            You have successfully reset your password.
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
    margin: 30
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


export default ResetPasswordSuccessfulScreen;
