import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View, StyleSheet, Text, Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type transaction = {
  vendorName: string;
  vendorType: 'consumables' | 'travel'
  transactionDate: string;
  amount: number;
};

const handleIcon = (vendorType) => {
  switch (vendorType) {
    case 'consumables':
      return 'silverware-fork-knife';

    case 'travel':
      return 'bag-suitcase';

    default:
      return 'shopping-outline';
  }
};

const styles = StyleSheet.create({
  amountContainer: {
    alignContent: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  amountText: {
    color: 'white',
    fontSize: 15,
  },
  container: {
    borderBottomWidth: 1,
    borderColor: 'white',
    borderStyle: 'dashed',
    paddingVertical: 15,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  dateText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    marginHorizontal: 2,
  },
  pageContainer: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  receipt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    marginHorizontal: 2,
  },
  vendorIcon: {
    alignSelf: 'center',
  },
  vendorIconContainer: {
    backgroundColor: '#aba6bc',
    borderRadius: 100,
    display: 'flex',
    height: 45,
    justifyContent: 'center',
    marginRight: 15,
    width: 45,
  },
  vendorTitle: {
    color: 'white',
    fontSize: 18,
  },
});

function TransactionCard({ transaction }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Login')} style={styles.pageContainer}>
        {/* Vender Icon */}
        <View style={styles.vendorIconContainer}>
          <Icon
            style={styles.vendorIcon}
            name={handleIcon(transaction.vendorType)}
            size={30}
            color="#0f003f"
          />
        </View>

        {/* Vender Info */}
        <View>
          <Text numberOfLines={1} style={styles.vendorTitle}>
            {transaction.vendorName ? transaction.vendorName : 'Unknown Vendor'}
          </Text>
          <View style={styles.dateContainer}>
            <Icon
              style={styles.dateText}
              name="receipt"
              size={12}
              color="#0f003f"
            />
            <Text style={styles.dateText}>
              {transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : 'XX XXX XXXX'}
            </Text>
          </View>
        </View>
        {/* Transaction Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>
            $
            {transaction.amount ? transaction.amount : '0'}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default TransactionCard;
