import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import QRCode from "react-native-qrcode-svg";
import { connectToWebSocket, getMerchant } from "../../api/api";

function QRGenerateMerchantScreen({ route }) {
  const { account } = route.params;
  const clientName = account.email.split("@")[0]; // Extract name from getMerchant
  const [transactionData, setTransactionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = Dimensions.get("window");
  const [merchant, setMerchant] = useState("");

  const fetchAccountInfo = async (account, setMerchant) => {
    try {
      const response = await getMerchant(account.account_id);
      setMerchant(response.company_name);
    } catch (error) {
      console.error("Get Merchant error:", error);
    }
  };

  useEffect(() => {
    fetchAccountInfo(account, setMerchant);
  }, [account]);


  useEffect(() => {

    const ws = connectToWebSocket(`/ws/clients/${clientName}`, (data) => {
      if (data) {

        const updatedData = {
          ...data,
          account_id: account.account_id,
          wallet_id: account.wallet.wallet_id,
          merchant: merchant,
          amount: formatPrice(data.amount),
          description: "POS",
        };
        console.log("POS generated:", updatedData)
        setTransactionData(updatedData);
        setIsLoading(false);
      }
    });

    return ws;
  }, [clientNameclientName, merchant]);

  const qrData = transactionData
    ? JSON.stringify(transactionData)
    : '';

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Waiting for POS transaction</Text>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.titleText}>Scan the QR code to pay</Text>
          <Table
            borderStyle={{ borderWidth: 2, borderColor: "#ffffff" }}
            style={{ width: "100%" }}
          >
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.headerText}
            />
            <Rows
              data={tableData}
              style={styles.rows}
              textStyle={styles.text}
            />
          </Table>
          <Text style={styles.totalText}>
            Total: $
            {transactionData ? transactionData.amount : "0.00"}
          </Text>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={qrData}
              size={0.7 * width}
              color="white"
              backgroundColor="#0f003f"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#0f003f",
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  head: {
    backgroundColor: "#0b0035",
    height: 40,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    margin: 6,
    textAlign: "center",
  },
  instructionText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  rows: {
    backgroundColor: "#1e1a52",
  },
  text: {
    color: "#ffffff",
    margin: 6,
    textAlign: "center",
  },
  titleText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  totalText: {
    color: "#ffffff",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default QRGenerateMerchantScreen;
