import React, { useState } from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import TransactionSearch from '../../components/TransactionSearch/TransactionSearch';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import ProfileModal from '../../components/ProfileModal/ProfileModal';

function ReceiptsScreen({ navigation }) {
  // change to axios call when transaction objects are done
  const transactions = [
    {
      transaction_ID: 1,
      vendor_name: 'McDonalds',
      transaction_date: '2021-04-01',
      amount: '$1000',
    },
    {
      transaction_ID: 2,
      vendor_name: 'Hungry Jacks',
      transaction_date: '2021-04-01',
      amount: '$1000',
    },
    {
      transaction_ID: 3,
      vendor_name: "Wendy's",
      transaction_date: '2021-04-01',
      amount: '$1000',
    },
    {
      transaction_ID: 4,
      vendor_name: 'Jollibee',
      transaction_date: '2021-04-01',
      amount: '$1000',
    },
    {
      transaction_ID: 5,
      vendor_name: "Carl's Jr.",
      transaction_date: '2021-04-01',
      amount: '$1000',
    },
    {
      transaction_ID: 6,
      vendor_name: 'KFC',
      transaction_date: '2021-04-01',
      amount: '$1000',
    },
    {
      transaction_ID: 7,
      vendor_name: 'Burger King',
      transaction_date: '2021-04-01',
      amount: '$1000',
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModal(modalValue) {
    setIsModalOpen(modalValue);
  };

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
        <TransactionSearch />
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
