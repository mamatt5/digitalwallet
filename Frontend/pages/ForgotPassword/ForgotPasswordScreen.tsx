import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";

const ForgotPasswordScreen = ({navigation}) => {

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
            <Text style={{ color: '#ffffff', fontSize: 30, margin: 30 }}>
              {'Forgot Password'}
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
            <Text onPress={() => navigation.navigate('Login')} style={{ color:'#ffffff', marginTop: 20}}>
              Log In
            </Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen;