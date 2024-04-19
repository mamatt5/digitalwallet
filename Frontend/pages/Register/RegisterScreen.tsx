import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Button } from "react-native-paper";
import {Picker} from '@react-native-picker/picker';
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { registerUser } from "../../api/api";

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("user");

  const handleRegistration = async () => {
    try {
      await registerUser(email, password, phoneNumber, accountType);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };


  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
        <ScrollView>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
            <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
              {'Register'}
            </Text>
            <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} />
            <DynamicTextInput placeholder="MOBILE NUMBER" onChangeText={setPhoneNumber} value={phoneNumber} />
            <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry />
            <Picker
                selectedValue={accountType}
                onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}
                style={{ width: 200, height: 50, color: 'white' }}  
                itemStyle={{ backgroundColor: 'lightgray', color: 'black', height: 44 }}
            >
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Merchant" value="merchant" />
            </Picker>
            <View style={{ margin:20, width:200}}>
              <Button buttonColor="#ffffff" textColor="#000000" onPress={handleRegistration}>
                  <Text style={{fontWeight:"bold"}}>
                    Sign Up
                  </Text>
                </Button>
            </View>
            <Text style={{ color:'#ffffff', marginTop: 20}} onPress={() => navigation.navigate('Login')}>
              Already have an account
            </Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;