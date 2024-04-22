import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Button } from "react-native-paper";
import {Picker} from '@react-native-picker/picker';
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { registerUser } from "../../api/api";
import Snackbar from "react-native-snackbar";

const RegisterUserScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("user");

  const handleRegistration = async () => {
    try {
      await registerUser(email, password, phoneNumber, accountType, firstName, lastName);
      Snackbar.show({
        text: 'User Created',
        duration: Snackbar.LENGTH_SHORT,
      });
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
              {'Register User'}
            </Text>
            <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} />
            <DynamicTextInput placeholder="MOBILE NUMBER" onChangeText={setPhoneNumber} value={phoneNumber} />
            <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry />
            <DynamicTextInput placeholder="FIRSTNAME" onChangeText={setFirstName} value={firstName} />
            <DynamicTextInput placeholder="LASTNAME" onChangeText={setLastName} value={lastName} />
            {/* <Picker
                selectedValue={accountType}
                onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}
                style={{ width: 200, height: 50, color: 'white' }}  
                itemStyle={{ backgroundColor: 'lightgray', color: 'black', height: 44 }}
            >
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Merchant" value="merchant" />
            </Picker> */}
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

export default RegisterUserScreen;