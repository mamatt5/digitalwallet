import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from '../../components/DynamicTextInput/DynamicTextInput';

const RegisterMerchantScreen = () => {

    // details of a merchant
    // can add more
    const [name, setName] = useState("");
    const [abn, setAbn] = useState("");

    const createMerchant = async () => {
        // api call to create merchant goes here
      };

      
    return (
        <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000}}>
            <ScrollView>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
                    <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
                    {'Register Merchant'}
                    </Text>
                    
                    
                    <DynamicTextInput placeholder="NAME" onChangeText={setName} value={name} />
                    <DynamicTextInput placeholder="ABN" onChangeText={setAbn} value={abn} />

                    <View style={{ margin:20, width:200}}>
                        <Button buttonColor="#ffffff" textColor="#000000" onPress={createMerchant}>
                            <Text style={{fontWeight:"bold"}}>
                                Register Merchant
                            </Text>
                        </Button>
                    </View>

                </ View>  
            </ScrollView>
        
        
        </SafeAreaView>
    )
}


export default RegisterMerchantScreen;