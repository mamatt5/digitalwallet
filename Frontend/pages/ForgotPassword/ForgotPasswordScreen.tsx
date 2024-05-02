import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import APPlogo from "../../assets/APPlogo.png";

const ForgotPasswordScreen = ({navigation}) => {

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
      <Image source={APPlogo} style={styles.APPlogo} />
        <ScrollView>
          <View style={styles.centerView}>
            <Text style={styles.titleText}>
              {'Forgot Password'}
            </Text>
            <Text  style={styles.verificationText}>
              Enter you email and we will send a verifcation code.
            </Text>
            <DynamicTextInput placeholder="EMAIL" />
            <View style={styles.buttonContainer}>
              <Button buttonColor="#ffffff" textColor="#000000">
                  <Text style={{fontWeight:"bold"}}>
                    Send Verification
                  </Text>
                </Button>
            </View>
            <Text onPress={() => navigation.navigate('Login')} style={styles.linkText}>
              Back
            </Text>
          </View>
        </ScrollView>
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
    width: 200
  },
  linkText: {
    color:'#ffffff', 
    marginTop: 20
  },
  verificationText: {
    color:'#ffffff', 
    marginBottom: 40
  }
});

export default ForgotPasswordScreen;