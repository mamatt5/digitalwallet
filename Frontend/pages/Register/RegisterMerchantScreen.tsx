import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { registerAccount } from "../../api/api";
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';





const RegisterMerchantScreen = ({navigation}) => {

    // details of a merchant
    // can add more
    const [companyName, setCompanyName] = useState("");
    const [abn, setAbn] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [companyNameError, setCompanyNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [abnError, setAbnError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    

    const createMerchant = async () => {
        // setPhoneNumber("0000000000")
        // setAbn("99 999 999 999")

        // regex for valid abn
        // if abn is empty return 
        setCompanyNameError(companyName === '')
        setAbnError(abn === '' || !/^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(abn));
        setEmailError(email === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email));
        setMobileError(phoneNumber === '' || !/^\d{10}$/.test(phoneNumber));
        setPasswordError(password === '')


        // try {

        //     await registerAccount(email, password, phoneNumber, "merchant", companyName, abn, "", "")
        //     navigation.navigate("Login");
        //   } catch (error) {
        //     console.error("Registration error:", error);
        
        //   }


      };

      
    return (
        <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
            <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
            <ScrollView>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
                    <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
                    {'Register Merchant'}
                    </Text>
                    
                    <View style={styles.container}>
                        <View>
                            <DynamicTextInput
                            placeholder="COMPANY NAME"
                            onChangeText={setCompanyName}
                            value={companyName}
                            error={companyNameError}
                            />
                        </View>
                        {companyNameError && (
                            <MaterialIcons
                            name="error-outline"
                            onPress={() => alert("Please enter a valid company name")}
                            color="red"
                            style={styles.errorIcon}
                            size = {25}
                            />
                        )}
                        </View>
                    
                    
                    <DynamicTextInput placeholder="ABN" onChangeText={setAbn} value={abn} error={abnError}/>
                    <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} error={emailError}/>
                    <DynamicTextInput placeholder="MOBILE NUMBER" onChangeText={setPhoneNumber} value={phoneNumber} error={mobileError}/>
                    <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry error={passwordError}/>

                    <View style={{ margin:20, width:200}}>
                        <Button buttonColor="#ffffff" textColor="#000000" onPress={createMerchant}>
                            <Text style={{fontWeight:"bold"}}>
                                Register Merchant
                            </Text>
                        </Button>
                    </View>

                </ View>  
            </ScrollView>
            </KeyboardAvoidingView>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Arrange children horizontally
      alignItems: 'center', // Align items vertically
      position: 'relative', // Required for absolute positioning
    },
    inputContainer: {
      flex: 1, // Take up remaining space
    },
    errorIcon: {
      position: 'absolute', // Position the icon absolutely
      right: -20, // Adjust the position as needed
    },
  });

export default RegisterMerchantScreen;
