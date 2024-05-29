import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAccount, getUser, getMerchant } from "../api/api";

const Transaction = ({ transaction, walletId }) => {
  
  const {
    vendor,
    sender,
    recipient,
    date,
    amount,
  } = transaction;

  console.log(transaction)

  const [vendorName, setVendorName] = useState("");
  const [isSender, setIsSender] = useState(false);

  const fetchAccount = async () => {
    try {
      const account = await getAccount(vendor);
      
      if (account.account_type === "user") {
        const user = await getUser(vendor);
        setVendorName(user.first_name + " " + user.last_name);
        
      } else if (account.account_type === "merchant") {
        const merchant = await getMerchant(vendor);
        setVendorName(merchant.company_name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccount();
    if (sender === walletId) {
      setIsSender(true);

    } else if (recipient === walletId) {
      setIsSender(false);
    }
  }, [vendor]);


  return (
    <View>
      <View style={styles.container}>

        <View style={styles.leftContainer}>
          <Text style={styles.vendor}>{vendorName}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <Text style={[styles.amount, isSender ? styles.sender : styles.recipient]}>{isSender ? '-' : '+'} ${amount}</Text>

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
  },
  sender: {
    color: "#F22625",
  },
  recipient: {
    color: "#75D940",
  },
  dashedLine: {
    borderTopWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 10,
    borderStyle: "dotted",
  },
});

export default Transaction;
