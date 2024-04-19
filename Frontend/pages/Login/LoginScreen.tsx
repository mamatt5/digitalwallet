import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              {'Login'}
            </Text>
            <DynamicTextInput placeholder="EMAIL" />
            <DynamicTextInput placeholder="PASSWORD" />
            <View style={{ margin:20, width:200}}>
              <Button buttonColor="#ffffff" textColor="#000000">
                  <Text style={{fontWeight:"bold"}}>
                    Log In
                  </Text>
                </Button>
            </View>
            <Text onPress={() => navigation.navigate('ForgotPassword')} style={{ color:'#ffffff', marginTop: 20}}>
              Forgot Password
            </Text>
            <Text onPress={() => navigation.navigate('Register')} style={{ color:'#ffffff', marginTop: 20}}>
              Sign Up
            </Text>
            <Text onPress={() => navigation.navigate('QRScan')} style={{ color:'#ffffff', marginTop: 20}}>
              QR Scanner Test
            </Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;