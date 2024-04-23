import React, { useState } from 'react';
import { SafeAreaView, Button, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CardsScreen = ({navigation}) => {
  const cards = [
    { id: '1', number: '1234 5678 9000 0001', expiry: '12/23' },
    { id: '2', number: '1234 5678 9000 0002', expiry: '01/24' },
  ];

  const Card = ({ number, expiry }) => {
    const [showFullNumber, setShowFullNumber] = useState(false);

    const displayNumber = showFullNumber ? number : '**** **** **** ' + number.slice(-4);

    return (
      <View style={{ 
        backgroundColor: '#fff', 
        padding: 20, 
        margin: 10, 
        borderRadius: 10, 
        width: '90%', 
        alignSelf: 'center', 
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>{displayNumber}</Text>
            <Text>Expiry: {expiry}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowFullNumber(!showFullNumber)}>
            <Icon name={showFullNumber ? "eye-slash" : "eye"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AddCardButton = () => {
    return (
      <TouchableOpacity style={{ 
        backgroundColor: '#fff', 
        padding: 20, 
        margin: 10, 
        borderRadius: 10, 
        width: '90%', 
        alignSelf: 'center', 
      }} onPress={() => navigation.navigate('AddCard')}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>+ Add Card</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', flex: 1 }}>
        <View>
        <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
          {'Cards'}
        </Text>
        <FlatList
          data={cards}
          renderItem={({ item }) => <Card number={item.number} expiry={item.expiry} />}
          keyExtractor={item => item.id}
        />
        <AddCardButton />
        </View>
    </SafeAreaView>
  );
}

export default CardsScreen;