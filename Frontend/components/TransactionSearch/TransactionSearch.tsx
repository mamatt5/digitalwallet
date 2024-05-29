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

function TransactionSearch({ navigation, transactions, account }) {

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
            <Pressable onPress={() => navigation.navigate('DetailedReceipt', { transaction: transactions[index], account })}>
              <TransactionCard transaction={transaction} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>

  );
}

export default TransactionSearch;
