import React, { useEffect, useState } from "react";
import { getMerchant, getUser } from "../../api/api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

const GenerateGenericQR = ({ route }) => {
  const { account } = route.params;

  const [qrValue, setQrValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [merchant, setMerchant] = useState("");
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");

  const fetchAccountInfo = async () => {
    if (account.account_type === "user") {
      try {
        const response = await getUser(account.account_id);
        setMerchant(response.first_name);
      } catch (error) {
        console.error("Get User error:", error);
      }
    } else if (account.account_type === "merchant") {
      try {
        const response = await getMerchant(account.account_id);
        setMerchant(response.company_name);
      } catch (error) {
        console.error("Get Merchant error:", error);
      }
    }
  };

  useEffect(() => {
    fetchAccountInfo();
    setWalletId(account.wallet.wallet_id);
  }, []);

  const generateQRCode = () => {
    if (!amount) return;

    const date = new Date();
    const qrData = {
      account_id: account.account_id,
      wallet_id: walletId, // wallet_id of the merchant
      merchant,
      amount: Number(amount),
    };

    setQrValue(JSON.stringify(qrData));
    setIsActive(true);
    console.log(qrData);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Generate QR code</Text>
        </View>

        <View style={styles.generatorContainer}>
          {!isActive && (
            <>
              <Text style={styles.subheaderText}>Payment value:</Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor={"lightgray"}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
              />
              <TouchableOpacity onPress={generateQRCode}>
                <Button style={styles.generateButton}
                textColor="black">Generate QR Code</Button>
              </TouchableOpacity>
            </>
          )}

          {isActive && (
            <View style={styles.qrcode}>
              <QRCode
                value={qrValue}
                size={300}
                color="black"
                backgroundColor="white"
              />

              <Button style={styles.generateButton}
              textColor="black"
              onPress={() => setIsActive(false)}>Generate new QR</Button>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GenerateGenericQR;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
  container: {
    justifyContent: "center",
    margin: 20,
  },
  header: {
    marginTop: 40,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
  },
  generatorContainer: {
    marginTop: 20,
  },
  subheaderText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    color: "#ffffff",
    fontSize: 24,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  qrcode: {
    marginTop: 30,
    alignItems: "center",
  },
});
