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
import { parse } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getMerchant, getUser } from "../../api/api";

function GenerateGenericQR({ route, navigation }) {
  const { account } = route.params;
  const { width } = Dimensions.get("window");

  const [qrValue, setQrValue] = useState("");
  const [isActive, setIsActive] = useState(false);

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
    setAmount("");
    setDescription("");
  }, [refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setIsActive(false);
    setAmount("");
    setDescription("");
  }, [refresh]);

  const onValueChange = (event) => {
    setValueError(false)
    setAmount(event)
  }
  const generateQRCode = () => {

    if (amount === '' || !/^\d+(\.\d+)?$/.test(amount)) {
      setValueError(true);
      Alert.alert('Invalid Payment Value', 'Please enter a valid payment value');
      return;
    }

    const formattedAmount = parseFloat(amount).toFixed(2);
 
    const date = new Date();

    // QR data
    const qrData = {
      amount: formattedAmount,
      account_id: account.account_id,
      wallet_id: walletId, // wallet_id of the merchant
      merchant,
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
              {account.account_type === "merchant" && (
                <View style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <TouchableOpacity
                    style={{ width: 40, height: 40 }}
                    onPress={() => navigation.navigate("GenerateQRMerchant")}>

                    <MaterialCommunityIcons
                      style={styles.generateMerchantButton}
                      name="receipt"
                      size={40}
                      color="#FFF"
                    />

                  </TouchableOpacity>
                </View>
              )}
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
}

export default GenerateGenericQR;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  generateMerchantButton: {
    position: "absolute",
    right: 0,
  },
  generatorContainer: {
    marginTop: 20,
  },
  header: {
    marginTop: 40,
  },
  headerText: {
    alignContent: "center",
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    
    borderColor: "gray",
    
    // color: "#ffffff",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 20,
    
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    // width:275
  },
  errorOutline: {
    borderColor: 'red', // Change border color to red when error occurs
    borderWidth: 2
  },
  generateButton: {
    backgroundColor: "#ffffff",
    marginTop: 60,
    width: 200,
    alignSelf: 'center'
  
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
