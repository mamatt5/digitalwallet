import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TransactionCard from "../TransactionCard/TransactionCard";

const styles = StyleSheet.create({
    filterButtonContainer: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        overflow:"hidden",
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: "center",
        width: 30,
        height: 30,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 100
      },
    searchbarContainer: {
        marginHorizontal: 30,
        marginVertical: 10
      },
      textInputContainer: {
        width: '85%',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 100
      },
      textInput: {
        marginLeft: 10,
        color: 'white'
      },
      recieptsContainer: {
        height: 500,
        marginHorizontal: 30,
        marginVertical: 10
      },
  });

const TransactionSearch = () => { 
  const navigation = useNavigation();
    // assume this is an API Call
    let transactions = [
        {
          transactionID: 1,
          vendorName: "KFC",
          vendorType: "consumables",
          transactionDate: "2021-04-01",
          amount: "19.95",
        },
        {
          transactionID: 2,
          vendorName: "Transport NSW",
          vendorType: "travel",
          transactionDate: "2021-04-01",
          amount: "10.75",
        },
        {
          transactionID: 3,
          vendorName: "Wendy's",
          vendorType: "consumables",
          transactionDate: "2021-04-01",
          amount: "1000",
        },
        {
          transactionID: 4,
          vendorName: "Woolworths",
          vendorType: "consumables",
          transactionDate: "2021-04-01",
          amount: "20",
        },
        {
          transactionID: 5,
          vendorName: "Carl's Jr.",
          vendorType: "consumables",
          transactionDate: "2021-04-01",
          amount: "1000",
        },
        {
          transactionID: 6,
          vendorName: "KFC",
          vendorType: "consumables",
          transactionDate: "2021-04-01",
          amount: "1000",
        },
        {
          transactionID: 7,
          vendorName: "Burger King",
          vendorType: "consumables",
          transactionDate: "2021-04-01",
          amount: "1000",
        },
      ];

  return (
    <View>
    <View style={styles.searchbarContainer}>
        <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} placeholder="Search" placeholderTextColor={'white'}></TextInput>
        </View>
        <View style={styles.filterButtonContainer}>
            <Icon 
                name="filter"
                size={30}
                color="#ffffff"
            /> 
        </View>
    </View>

    <ScrollView style={styles.recieptsContainer}>
    {transactions.map((transaction, index) => (
            <View key={index}>
              <TransactionCard transaction={transaction} />
            </View>
          ))}
    </ScrollView>
  </View>

  );
};

export default TransactionSearch;