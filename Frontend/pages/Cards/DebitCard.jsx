import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
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
        case '1':
        case '2':
        case '5':
          return MasterCard;

        case '3':
        case '6':
        case '8':
          return AmExCard;


        case '4':
        case '7':
        case '9':
          return VisaCard;


        default:
          return VisaCard;
      }
    };

    return (
      <ImageBackground source={getCardImage(number)} style={styles.card}>

        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardNumber}>{displayNumber}</Text>
            <Text>exp: {expiry}</Text>
          </View>

          <TouchableOpacity onPress={() => setShowFullNumber(!showFullNumber)} style={styles.eyeButton}>
            <Icon name={showFullNumber ? "eye-slash" : "eye"} size={20} color="#fff" />
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  };


  const styles = StyleSheet.create({
    card: {
      padding: 20,
      margin: 10,
      borderRadius: 10,
      width: 300,
      height: 200,
      alignSelf: 'center',
    },

    cardInfo: {
      marginTop: 110,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    cardNumber: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 10,
    },

    eyeButton: {
      marginBottom: 30,
    }
  })

export default DebitCard