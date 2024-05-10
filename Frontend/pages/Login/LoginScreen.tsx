import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { loginUser } from "../../api/api";
import APPlogo from "../../assets/APPlogo.png";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      console.log(response)
      const { account } = response;
      console.log("Account data:", account);
      if (account) {
        navigation.navigate("Main", { account });
      } else {
        console.error("Account object is missing in response");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Image source={APPlogo} style={styles.APPlogo} />
      <ScrollView>
        <View style={styles.centerView}>
          <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} />
          <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry />
          <View style={styles.buttonContainer}>
            <Button buttonColor="#ffffff" textColor="#000000" onPress={handleLogin}>
              <Text style={{fontWeight:"bold"}}>
                Log In
              </Text>
            </Button>
          </View>
          <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkText}>
            Forgot Password
          </Text>
          <Text onPress={() => navigation.navigate('RegisterOption')} style={styles.linkText}>
            Sign Up
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )};

const styles = StyleSheet.create({
  APPlogo: {
    width: 150, 
    height: 150, 
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
  }
});

export default LoginScreen;