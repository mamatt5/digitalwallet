import React, { useEffect, useState } from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import TransactionSearch from '../../components/TransactionSearch/TransactionSearch';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import ProfileModal from '../../components/ProfileModal/ProfileModal';
import { getTransactionsBySender, getMerchant } from '../../api/api';

function ReceiptsScreen({ navigation, route }) {
  const { account } = route.params


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  function handleModal(modalValue) {
    setIsModalOpen(modalValue);
  };

  const fetchTransactionsBySender = async () => {
    try {
      const transactions = await getTransactionsBySender(account.wallet.wallet_id);
      const sortedTransactions = transactions.sort((a, b) => b.transaction_id - a.transaction_id);
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Get Transactions error:', error);
    }
  }

  useEffect(() => {
    fetchTransactionsBySender();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        {isModalOpen && (
          <ProfileModal setModalstate={handleModal}></ProfileModal>
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Receipts</Text>
        <Pressable onPress={() => setIsModalOpen(true)} style={styles.profileContainer}>
          <ProfileButton></ProfileButton>
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <Text style={styles.searchbarTitle}>Recent Activity</Text>
        </View>
        <TransactionSearch navigation={navigation} transactions={transactions} account={account} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    marginHorizontal: 30,
  },
  container: {
    backgroundColor: '#0f003f',
    height: 2000,
  },
  searchbarTitle: {
    color: '#ffffff',
    fontSize: 30,
  },
  headerContainer: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 10,
  },  
  titleText: {
    color: '#ffffff',
    fontSize: 40,
  },
  profileContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 1,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 30,
  }
});

export default ReceiptsScreen;
