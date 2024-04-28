import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { loginUser } from "../../api/api";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      const { account } = response;
      navigation.navigate("Account", { account });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              {'Login'}
            </Text>
            <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} />
            <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry />
            <View style={{ margin:20, width:200}}>
              <Button buttonColor="#ffffff" textColor="#000000" onPress={handleLogin}>
                  <Text style={{fontWeight:"bold"}}>
                    Log In
                  </Text>
                </Button>
            </View>
            <Text onPress={() => navigation.navigate('ForgotPassword')} style={{ color:'#ffffff', marginTop: 20}}>
              Forgot Password
            </Text>
            <Text onPress={() => navigation.navigate('RegisterOption')} style={{ color:'#ffffff', marginTop: 20}}>
              Sign Up
            </Text>
            <Text onPress={() => navigation.navigate('QRScan')} style={{ color:'#ffffff', marginTop: 20}}>
              QR Scanner Test
            </Text>
            <Text onPress={() => navigation.navigate('QRGenerateMerchant')} style={{ color:'#ffffff', marginTop: 20}}>
              QR Generate Merchant Test
            </Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;