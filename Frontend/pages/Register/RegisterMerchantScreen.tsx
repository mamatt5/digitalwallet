import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';
import { registerAccount } from "../../api/api";

// import Snackbar from "react-native-snackbar";




const RegisterMerchantScreen = ({navigation}) => {

    // details of a merchant
    // can add more
    const [companyName, setCompanyName] = useState("");
    const [abn, setAbn] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [abnError, setAbnError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    

    const createMerchant = async () => {
        // setPhoneNumber("0000000000")
        // setAbn("99 s99 999 999")

        setAbnError(!/^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(abn));
        setMobileError(!/^\d{10}$/.test(phoneNumber));


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
                    
                    
                    <DynamicTextInput placeholder="COMPANY NAME" onChangeText={setCompanyName} value={companyName} error={false} />
                    <DynamicTextInput placeholder="ABN" onChangeText={setAbn} value={abn} error={abnError}/>
                    <DynamicTextInput placeholder="EMAIL" onChangeText={setEmail} value={email} error={false}/>
                    <DynamicTextInput placeholder="MOBILE NUMBER" onChangeText={setPhoneNumber} value={phoneNumber} error={mobileError}/>
                    <DynamicTextInput placeholder="PASSWORD" onChangeText={setPassword} value={password} secureTextEntry error={false}/>

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


export default RegisterMerchantScreen;
