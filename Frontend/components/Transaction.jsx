import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Transaction = ({ transaction }) => {
  const {
    vendor_name: vendor,
    transaction_date: date,
    amount: amount,
  } = transaction;

  return (
    <View>
      <View style={styles.container}>

        <View style={styles.leftContainer}>
          <Text style={styles.vendor}>{vendor}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <Text style={styles.amount}>{amount}</Text>

      </View>
      
      <View style={styles.dashedLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  leftContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  vendor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 12,
    color: "#fff",
  },
  amount: {
    fontSize: 16,
    color: "#fff",
  },
  dashedLine: {
    borderTopWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 10,
    borderStyle: "dotted",
  },
});

export default Transaction;
