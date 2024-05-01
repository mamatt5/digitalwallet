import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import VisaCard from '../../assets/VisaCard.png';
import MasterCard from '../../assets/MasterCard.png';
import AmExCard from '../../assets/AmExCard.png';

const DebitCard = ({ number, expiry }) => {
    const [showFullNumber, setShowFullNumber] = useState(false);

    const displayNumber = showFullNumber ? 
      number.slice(0, 4) + ' ' + number.slice(4, 8) + ' ' + number.slice(8, 12) + ' ' + number.slice(12, 16)
      : '**** **** **** ' + number.slice(-4);

    const getCardImage = (number) => {
      switch (number[0]) {
        case '2':
        case '5':
          return MasterCard;
        case '3': // should actually be 15 digits
          return AmExCard;
        case '4':
          return VisaCard;
        default:
          return VisaCard;
      }
    };

    return (
      <ImageBackground source={getCardImage(number)} style={{ 
        padding: 20, 
        margin: 10, 
        borderRadius: 10, 
        width: 300,
        height: 200, 
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
      </ImageBackground>
    );
  };

export default DebitCard