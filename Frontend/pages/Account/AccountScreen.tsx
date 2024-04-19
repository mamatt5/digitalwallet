import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "react-native-paper";

const AccountScreen = ({ navigation, route }) => {
  const { account } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: "#0f003f", height: 2000 }}>
      <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold", marginVertical: 30 }}>Account Information</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}><Text style={{ fontWeight: "bold" }}>Account ID:</Text> {account.account_id}</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}><Text style={{ fontWeight: "bold" }}>Email:</Text> {account.email}</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}><Text style={{ fontWeight: "bold" }}>Phone Number:</Text> {account.phone_number}</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 20 }}><Text style={{ fontWeight: "bold" }}>Account Type:</Text> {account.account_type}</Text>
        <View style={{ margin: 20, width: 200 }}>
          <Button buttonColor="#ffffff" textColor="#000000" onPress={() => navigation.navigate("QRScan")}>
            <Text style={{ fontWeight: "bold" }}>QR Code Scan</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
