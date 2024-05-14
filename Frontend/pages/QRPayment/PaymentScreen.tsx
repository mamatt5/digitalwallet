import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";

const PaymentScreen = ({ route }) => {
  const { data } = route.params;
  let parsedData;
  let isValidQR = false;

  try {
    parsedData = JSON.parse(data);

    if (
      parsedData.merchant &&
      parsedData.amount &&
      parsedData.date &&
      parsedData.time
    ) {
      isValidQR = true;
    }
  } catch (error) {
    console.error("Error parsing QR data", error);
    isValidQR = false;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.qrData}>
          {isValidQR ? (
            <>
              <View>
                <Icon
                  name="money-bill-transfer"
                  size={150}
                  color={"lightgray"}
                />
              </View>
              <Text style={styles.merchant}>{parsedData.merchant}</Text>
              <Text style={styles.amount}>${parsedData.amount}</Text>
              <Text style={styles.date}>Date: {parsedData.date}</Text>
              <Text style={styles.time}>Time: {parsedData.time}</Text>

              <View style={styles.buttonContainer}>
                <Button style={styles.proceedButton} textColor="black" mode="contained">Proceed to payment</Button>
                <Button style={styles.cancelButton} textColor="white" mode="outlined">Cancel</Button>
              </View>
            </>
          ) : (
            <Text style={styles.headerText}> QR Code invalid!</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = {
  screenContainer: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  qrData: {
    marginTop: 20,
    alignItems: "center",
  },
  merchant: {
    color: "#ffffff",
    fontSize: 50,
    marginBottom: 30,
    fontWeight: "bold",
  },
  amount: {
    color: "#ffffff",
    fontSize: 40,
    marginBottom: 30,
    fontWeight: "bold",
  },
  date: {
    color: "#ffffff",
    fontSize: 18,
  },
  time: {
    color: "#ffffff",
    fontSize: 18,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    margin: 30,
    alignContent: "center",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
    alignSelf: "center",
    width: "50%",
  },
  proceedButton: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  cancelButton: {
    borderColor: '#ffffff',
  },
};
