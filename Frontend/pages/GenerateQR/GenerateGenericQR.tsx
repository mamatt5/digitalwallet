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
import { parse } from "react-native-svg";

const GenerateGenericQR = ({ route }) => {
  const { account } = route.params;

  const [qrValue, setQrValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [merchant, setMerchant] = useState("");
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

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

    const formattedAmount = parseFloat(amount).toFixed(2);

    const date = new Date();
    const qrData = {
      account_id: account.account_id,
      wallet_id: walletId, // wallet_id of the merchant
      merchant,
      amount: formattedAmount,
      description,
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
              <Text style={styles.subheaderText}>Description:</Text>
              <TextInput
                placeholder="for groceries"
                placeholderTextColor={"lightgray"}
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <TouchableOpacity onPress={generateQRCode}>
                <Button style={styles.generateButton} textColor="black">
                  Generate QR Code
                </Button>
              </TouchableOpacity>
            </>
          )}

          {isActive && (
            <View style={styles.qrcode}>
              <QRCode
                value={qrValue}
                size={350}
                color="black"
                backgroundColor="white"
              />

              <View style={styles.qrcode}>
                <Text style={styles.qrDetails}>
                  Pay ${parseFloat(amount).toFixed(2)} to {merchant} for "{description}"
                </Text>
              </View>

              <Button
                style={styles.generateButton}
                textColor="black"
                onPress={() => setIsActive(false)}
              >
                Generate new QR
              </Button>
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
    marginTop: 40,
  },
  qrcode: {
    marginTop: 30,
    alignItems: "center",
  },
  qrDetails: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});
