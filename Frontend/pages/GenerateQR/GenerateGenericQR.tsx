import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getMerchant, getUser } from "../../api/api";
import { Switch } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function GenerateGenericQR({ route, navigation }) {
  const { account } = route.params;
  const { width } = Dimensions.get("window");

  const [qrValue, setQrValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [multipleUse, setMultipleUse] = useState(false);

  const [merchant, setMerchant] = useState("");
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [valueError, setValueError] = useState(false);

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setIsActive(false);
    setMultipleUse(false);
    setAmount("");
    setDescription("");
    console.log("Multple use: " + multipleUse);
  }, [refresh]);

  const onValueChange = (event) => {
    setValueError(false);
    setAmount(event);
  };
  const generateQRCode = () => {
    if (amount === "" || !/^\d+(\.\d+)?$/.test(amount)) {
      setValueError(true);
      Alert.alert(
        "Invalid Payment Value",
        "Please enter a valid payment value"
      );
      return;
    }

    const formattedAmount = parseFloat(amount).toFixed(2);

    let transaction_reference;
    if (!multipleUse) {
      const salt = Math.random().toString(36).substring(2,15);
      transaction_reference = merchant + salt;
    }

    // QR data
    const qrData = {
      amount: formattedAmount,
      account_id: account.account_id,
      wallet_id: walletId, // wallet_id of the merchant
      merchant,
      description,
      ...(transaction_reference && {transaction_reference}),
    };

    setQrValue(JSON.stringify(qrData));
    setIsActive(true);
    console.log("QR generated: ", qrData);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Generate QR code</Text>
          {account.account_type === "merchant" && (
            <TouchableOpacity
              onPress={() => navigation.navigate("GenerateQRMerchant")}
              style={styles.iconButton}
            >
              <MaterialCommunityIcons
                name="qrcode"
                size={25 * scale}
                color="#FFF"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.generatorContainer}>
          {!isActive && (
            <>
              <Text style={styles.subheaderText}>Payment amount:</Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor="lightgray"
                value={amount}
                onChangeText={onValueChange}
                keyboardType="numeric"
                style={[styles.input, valueError && styles.errorOutline]}
              />
              <Text style={styles.subheaderText}>Description:</Text>
              <TextInput
                placeholder="eg. for groceries"
                placeholderTextColor="lightgray"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Reusable: </Text>
                <Switch
                  value={multipleUse}
                  onValueChange={(newValue) => setMultipleUse(newValue)}
                />
              </View>
              <Button
                style={styles.generateButton}
                textColor="black"
                onPress={generateQRCode}
              >
                Generate QR Code
              </Button>
            </>
          )}

          {isActive && (
            <View style={styles.qrcode}>
              <QRCode
                value={qrValue}
                size={0.7 * width}
                color="white"
                backgroundColor="#0f003f"
              />
              <View style={styles.qrcode}>
                <Text style={styles.qrDetails}>
                  Pay ${parseFloat(amount).toFixed(2)} to {merchant} for "
                  {description}"
                  {multipleUse ? "" : " (one-time use)"}
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
}

export default GenerateGenericQR;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 20 * scale,
  },
  generateButton: {
    backgroundColor: "#ffffff",
    marginTop: 60,
  },
  generatorContainer: {
    marginTop: 35 * scale,
  },
  generateMerchantButton: {
    position: "absolute",
    right: 0,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20 * scale,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 20 * scale,
    fontWeight: "bold",
    textAlign: "center",
    alignContent: "center",
  },
  iconButton: {
    position: "absolute",
    right: 10,
  },
  input: {
    borderColor: "gray",

    // color: "#ffffff",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 20,

    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
  },
  errorOutline: {
    borderColor: "red", // Change border color to red when error occurs
    borderWidth: 2,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  switchText: {
    color: "#ffffff",
    fontSize: 12 * scale,
    textAlign: "center",
  },

  qrcode: {
    alignItems: "center",
    marginTop: 30,
  },
  qrDetails: {
    alignContent: "center",
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
  },
  screenContainer: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
  subheaderText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
});
