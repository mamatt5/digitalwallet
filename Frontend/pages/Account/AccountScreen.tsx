/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DebitCard from '../Cards/DebitCard';

function AccountScreen({ navigation, route }) {
  const cards = [
    { id: '1', number: '1234 5678 9000 0001', expiry: '12/23' },
    { id: '2', number: '1234 5678 9000 0002', expiry: '01/24' },
    { id: '3', number: '1234 5678 9000 0003', expiry: '01/24' },
    { id: '4', number: '1234 5678 9000 0004', expiry: '01/24' },
    { id: 'add' },
  ];

  const { account } = route.params;

  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    if (item.id === 'add') {
      return (
        <View style={{
          backgroundColor: '#ffffff', width: 300, height: 200, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('AddCard', { account })}>
            <Text style={{ fontWeight: 'bold' }}>+ Add card</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <DebitCard number={item.number} expiry={item.expiry} />
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginVertical: 30,
        }}
        >
          Account Information
        </Text>
        <Text style={{ color: '#ffffff', fontSize: 18, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Account ID:</Text>
          {' '}
          {account.account_id}
        </Text>
        <Text style={{ color: '#ffffff', fontSize: 18, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Email:</Text>
          {' '}
          {account.email}
        </Text>
        <Text style={{ color: '#ffffff', fontSize: 18, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Phone Number:</Text>
          {' '}
          {account.phone_number}
        </Text>
        <Text style={{ color: '#ffffff', fontSize: 18, marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Account Type:</Text>
          {' '}
          {account.account_type}
        </Text>

        <Carousel
          layout="default"
          data={cards}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />

        <View style={{ margin: 20, width: 200 }}>
          <Button buttonColor="#ffffff" textColor="#000000" onPress={() => navigation.navigate('QRScan')}>
            <Text style={{ fontWeight: 'bold' }}>QR Code Scan</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AccountScreen;
