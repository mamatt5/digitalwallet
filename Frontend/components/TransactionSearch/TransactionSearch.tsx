import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View, StyleSheet, TextInput, ScrollView, Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionCard from '../TransactionCard/TransactionCard';

const styles = StyleSheet.create({
  filterButtonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 1,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    width: 30,
  },
  recieptsContainer: {
    height: 500,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  searchbarContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  textInput: {
    color: 'white',
    marginLeft: 10,
  },
  textInputContainer: {
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    width: '85%',
  },
});

function TransactionSearch({ navigation }) {
  // assume this is an API Call
  const transactions = [
    {
      transactionID: 1,
      vendorName: 'KFC',
      vendorType: 'consumables',
      transactionDate: '2021-04-01',
      amount: '19.95',
    },
    {
      transactionID: 2,
      vendorName: 'Transport NSW',
      vendorType: 'travel',
      transactionDate: '2021-04-01',
      amount: '10.75',
    },
    {
      transactionID: 3,
      vendorName: "Wendy's",
      vendorType: 'consumables',
      transactionDate: '2021-04-01',
      amount: '1000',
    },
    {
      transactionID: 4,
      vendorName: 'Woolworths',
      vendorType: 'consumables',
      transactionDate: '2021-04-01',
      amount: '20',
    },
    {
      transactionID: 5,
      vendorName: "Carl's Jr.",
      vendorType: 'consumables',
      transactionDate: '2021-04-01',
      amount: '1000',
    },
    {
      transactionID: 6,
      vendorName: 'KFC',
      vendorType: 'consumables',
      transactionDate: '2021-04-01',
      amount: '1000',
    },
    {
      transactionID: 7,
      vendorName: 'Burger King',
      vendorType: 'consumables',
      transactionDate: '2021-04-01',
      amount: '1000',
    },
  ];

  return (
    <View>
      <View style={styles.searchbarContainer}>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholder="Search" placeholderTextColor="white" />
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
            <Pressable onPress={() => navigation.navigate('DetailedReceipt', { transaction: transactions[index]})}>
              <TransactionCard transaction={transaction} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>

  );
}

export default TransactionSearch;
