import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, Dimensions, StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DebitCard from '../../components/DebitCard';
import Transaction from '../../components/Transaction';
import { getWalletCards, getMerchant, getUser } from '../../api/api';

function AccountScreen({ navigation, route }) {
  const [cards, setCards] = useState([]);
  const { account } = route.params;
  const [loggedAccount, setLoggedAccount] = useState('');

  const [activeIndex, setActiveIndex] = useState(0);

  // change to axios call when transaction objects are done
  const transactions = [
    {
      transaction_ID: 1,
      vendor_name: 'McDonalds',
      transaction_date: '2024-04-25',
      amount: '$12.50',
    },
    {
      transaction_ID: 2,
      vendor_name: 'Hungry Jacks',
      transaction_date: '2024-04-18',
      amount: '$30.00',
    },
    {
      transaction_ID: 3,
      vendor_name: "Wendy's",
      transaction_date: '2024-04-12',
      amount: '$16.90',
    },
    {
      transaction_ID: 4,
      vendor_name: 'Jollibee',
      transaction_date: '2024-04-10',
      amount: '$23.90',
    },
    {
      transaction_ID: 5,
      vendor_name: "Carl's Jr.",
      transaction_date: '2024-04-09',
      amount: '$11.99',
    },
    {
      transaction_ID: 6,
      vendor_name: 'KFC',
      transaction_date: '2024-04-05',
      amount: '$25.10',
    },
    {
      transaction_ID: 7,
      vendor_name: 'Burger King',
      transaction_date: '2021-04-01',
      amount: '$18.00',
    },
  ];

  const fetchAccountInfo = async () => {
    if (account.account_type === 'user') {
      try {
        const response = await getUser(account.account_id);
        setLoggedAccount(response.first_name);
      } catch (error) {
        console.error('Get User error:', error);
      }
    } else if (account.account_type === 'merchant') {
      try {
        const response = await getMerchant(account.account_id);
        setLoggedAccount(response.company_name);
      } catch (error) {
        console.error('Get Merchant error:', error);
      }
    }
  };

  const fetchCards = async () => {
    try {
      const response = await getWalletCards(account.wallet.wallet_id);
      setCards(response);
    } catch (error) {
      console.error('Get Cards error:', error);
    }
  };

  const _renderItem = ({ item, index }) => <DebitCard card={item} />;

  useEffect(() => {
    fetchCards();
    fetchAccountInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <Text style={styles.titleText}>
          Welcome,
          {loggedAccount}
          !
        </Text>
        {cards.length === 0 ? (
          <View style={styles.noCardContainer}>
            <Text style={styles.noCardText}>No card found</Text>
          </View>
        ) : (
          <Carousel
            layout="default"
            data={cards}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            loop
          />
        )}

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddCard', { account, fetchCards })}
          >
            <Icon name="plus-square-o" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.transactionContainer}>
        <View>
          <Text style={styles.titleText}> Transactions </Text>
        </View>

        <ScrollView style={styles.transactions}>
          {transactions.map((transaction, index) => (
            <View key={index}>
              <Transaction transaction={transaction} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: 20,
    marginTop: 10,
    width: 200,
  },
  centerView: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#0f003f',
    flex: 1,
  },
  iconContainer: {
    marginTop: 10,
  },
  infoText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 10,
  },
  noCardContainer: {
    alignItems: 'center',
    borderColor: '#fff',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    height: 150,
    justifyContent: 'center',
    width: 250,
  },
  noCardText: {
    color: '#fff',
    fontSize: 18,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  transactionContainer: {
    flex: 1,
  },
  transactions: {
    flex: 1,
  },
});

export default AccountScreen;
