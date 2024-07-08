import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import QRCode from "react-native-qrcode-svg";
import { QRCode as CustomQRCode } from '@jackybaby/react-custom-qrcode';
import { connectToWebSocket, getMerchant, API_BASE_URL } from "../../api/api";
import React from "react";
import axios from "axios";
import { LOCAL_IP } from "@env";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function QRGenerateMerchantScreen({ route }) {
  const { account } = route.params;
  const clientName = account.email.split("@")[0]; // Extract name from getMerchant
  const [transactionData, setTransactionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = Dimensions.get("window");
  const [merchant, setMerchant] = useState("");
  const [image, setImage] = useState(null);

  const QR_IMAGE_ENDPOINT = `${API_BASE_URL}/qr_images/get/merchantId/13`;
  const getQRImage = async () => {
    try {
      const response = await axios.get(QR_IMAGE_ENDPOINT, { responseType: 'blob' });
      const blob = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
      setImage(blob);
    } catch (error) {
      console.error(error);
    }
  };

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
    getQRImage();
  }, [account]);

  useEffect(() => {
    const ws = connectToWebSocket(`/ws/clients/${clientName}`, (data) => {
      const salt = Math.random().toString(36).substring(2, 15);
      const transaction_reference = merchant + salt;
      console.log("Transaction Reference in POS: " + transaction_reference);
      if (data) {
        const updatedData = {
          ...data,
          account_id: account.account_id,
          wallet_id: account.wallet.wallet_id,
          merchant: merchant,
          amount: formatPrice(data.amount),
          description: "POS",
          transaction_reference: transaction_reference,
        };
        console.log("POS generated:", updatedData);
        setTransactionData(updatedData);
        setIsLoading(false);
      }
    });

    return ws;
  }, [clientName, merchant]);

  const qrData = transactionData ? JSON.stringify(transactionData) : "";

  const formatPrice = (price) => {
    const number = parseFloat(price);
    return isNaN(number) ? "0.00" : number.toFixed(2);
  };

  const tableHead = ["Item", "Quantity", "Price ($)"];
  const tableData = transactionData
    ? transactionData.items.map((item) => [
      item.name,
      item.quantity.toString(),
      `$${formatPrice(item.price)}`,
    ])
    : [];

  return (
    <ScrollView style={styles.scrollContainer}> 
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Waiting for POS transaction</Text>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.titleText}>Scan the QR code to pay</Text>
          <View style={styles.tableContainer}>
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
              Total: ${transactionData ? transactionData.amount : "0.00"}
            </Text>
          </View>
          <View style={styles.qrCodeContainer}>
            {image ?
              <CustomQRCode
                value={qrData}
                size={260}
                bgColor="transparent"
                fgColor="#000000"
                logoImage={image}
                logoWidth={260}
                logoHeight={260}
                logoOpacity={0.3}
                removeQrCodeBehindLogo={false}
                qrStyle="dots"
                ecLevel="H"
                id="myQRCode"
              /> :
              <QRCode
                value={qrData}
                size={0.45 * width}
                color="white"
                backgroundColor="#0f003f"
              />}

          </View>
        </View>
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#0f003f",
  },
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
    height: 25 * scale,
  },
  tableContainer: {
    paddingHorizontal: 30 * scale,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    margin: 6,
    textAlign: "center",
    fontSize: 12 * scale,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 20 * scale,
    marginBottom: 20,
    textAlign: "center",
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  overlayImage: {  
    width: 0.6 * width,
    height: 0.6 * width,
    opacity: 0.4,
    resizeMode: "contain",
    position: "absolute",
  },
  rows: {
    backgroundColor: "#1e1a52",
  },
  text: {
    color: "#ffffff",
    margin: 6 * scale,
    textAlign: "center",
    fontSize: 8 * scale,
  },
  titleText: {
    color: "#ffffff",
    fontSize: 24 * scale,
    fontWeight: "bold",
    marginBottom: 20 * scale,
    textAlign: "center",
  },
  totalText: {
    color: "#ffffff",
    fontSize: 10 * scale,
    marginVertical: 20,
    fontWeight: "bold",
  },
});

export default QRGenerateMerchantScreen;
