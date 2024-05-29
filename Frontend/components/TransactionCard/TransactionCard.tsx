import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMerchant } from '../../api/api';

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
  const [merchantName, setMerchantName] = useState('Unknown Vendor');

  const fetchMerchant = async () => {
    try {
      const merchant = await getMerchant(transaction.vendor)
      setMerchantName(merchant.company_name);
    } catch (error) {
      console.error('Get Merchant error:', error);
      throw error;
    }};

    const convertDate = (date) => {
      const [day, month, year] = date.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    useEffect(() => {
      fetchMerchant();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.pageContainer}>
        {/* Vender Icon */}
        <View style={styles.vendorIconContainer}>
          <Icon
            style={styles.vendorIcon}
            name={handleIcon("default")}
            size={30}
            color="#0f003f"
          />
        </View>

        {/* Vender Info */}
        <View>
          <Text numberOfLines={1} style={styles.vendorTitle}>
            {merchantName}
          </Text>
          <View style={styles.dateContainer}>
            <Icon
              style={styles.dateText}
              name="receipt"
              size={12}
              color="#0f003f"
            />
            <Text style={styles.dateText}>
              {transaction.date ? new Date(convertDate(transaction.date)).toLocaleDateString(undefined, { year: '2-digit', month: 'short', day: '2-digit' }) : 'Unknown Date'}
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
      </View>
    </View>
  );
}

export default TransactionCard;
