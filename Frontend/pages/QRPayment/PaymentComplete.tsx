import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const PaymentComplete = ({ route, navigation }) => {
  const { parsedData, selectedCardData, date, time } = route.params;

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.checkmark}>
          <Icon name="check" size={150} color={"lightgreen"} />
        </View>

        <Text style={styles.titleText}>Payment successful!</Text>
        <Text style={styles.text}>Thank you for your payment.</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.text}>
            Paid ${parsedData.amount} to {parsedData.merchant} with card ending
            in ******{selectedCardData.card_number.slice(-4)}
          </Text>

          <View style={styles.datetime}>
            <Text style={styles.subtext}>Date: {date}</Text>
            <Text style={styles.subtext}>Time: {time}</Text>
          </View>


        </View>
        <Button
          mode="contained"
          style={styles.button}
          textColor="black"
          onPress={() => navigation.navigate("AccountHome")}
        >
          OK
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PaymentComplete;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
  container: {
    alignItems: "center",
  },
  checkmark: {
    marginTop: 50,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  detailsContainer: {
    marginTop: 80,
    margin: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  datetime: {
    marginTop: 50,
  },
  subtext: {
    fontSize: 16,
    color: "#ffffff",
  },
  button: {
    marginTop: 40,
    width: 100,
    backgroundColor: "#ffffff",
  },
});
