import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, Dimensions, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DebitCard from '../../components/DebitCard';
import LoyaltyCard from '../../components/LoyaltyCard';
import Transaction from '../../components/Transaction';
import {
  getWalletCards, getMerchant, getUser, getTransactions, fetchLoyaltyCards,
} from '../../api/api';
import CardTabs from '../../components/CardFilterTabs/CardTabs';

function AccountScreen({ navigation, route }) {
  const [bankCards, setBankCards] = useState([]);
  const [loyaltyCards, setLoyaltyCards] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const { account } = route.params;
  const [loggedAccount, setLoggedAccount] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      const bankCards = await getWalletCards(account.wallet.wallet_id);
      const loyaltyCards = await fetchLoyaltyCards();
      setBankCards(bankCards);
      setLoyaltyCards(loyaltyCards);
    } catch (error) {
      console.error('Get Cards error:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions(bankCards[activeIndex].card_id);
      setTransactions(response);
    } catch (error) {
      console.error('Get Transactions error:', error);
    }
  };

  const _renderItem = ({ item }) => {
    if (activeTabIndex === 0) {
      return <DebitCard bankCard={item} />;
    }
    return <LoyaltyCard loyaltyCard={item} />;
  };

  const renderCards = () => {
    const activeCards = activeTabIndex === 0 ? bankCards : loyaltyCards;
    if (activeCards.length === 0) {
      return <View style={styles.noCardContainer}><Text style={styles.noCardText}>No cards found</Text></View>;
    }
    return (
      <Carousel
        layout="default"
        data={activeCards}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    );
  };

  useEffect(() => {
    fetchCards();
    fetchAccountInfo();
  }, [refresh]);

  useEffect(() => {
    if (bankCards.length > 0) {
      fetchTransactions();
    }
  }, [bankCards, activeIndex, refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <Text style={styles.titleText}>
          Welcome,
          {' '}
          {loggedAccount}
          !
        </Text>
        <CardTabs activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
        {renderCards()}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddCard', { account, refresh })}
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
          {transactions.length === 0 ? (
            <View style={styles.noTransactionsContainer}>
              <Text style={styles.noCardText}>No transactions found</Text>
            </View>
          ) : (
            transactions.map((transaction, index) => (
              <View key={index}>
                <Transaction transaction={transaction} />
              </View>
            ))
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;

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
    marginTop: 10,
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
  noTransactionsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  transactionContainer: {
    flex: 1,
    ...(screenWidth >= 600 && {
      marginHorizontal: 100,
    })
  },
  transactions: {
    flex: 1,
  },
});

export default AccountScreen;
