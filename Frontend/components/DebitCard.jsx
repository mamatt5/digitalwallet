import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import VisaCard1 from '../assets/VisaCard.png';
import VisaCard2 from '../assets/VisaCard2.png';
import VisaCard3 from '../assets/VisaCard3.png';
import MasterCard1 from '../assets/MasterCard.png';
import MasterCard2 from '../assets/MasterCard2.png';
import MasterCard3 from '../assets/MasterCard3.png';
import AmExCard1 from '../assets/AmExCard.png';
import AmExCard2 from '../assets/AmExCard2.png';
import AmExCard3 from '../assets/AmExCard3.png';

function DebitCard({ bankCard }) {
  const { card_number: number, card_expiry: expiry } = bankCard;
  const [showFullNumber, setShowFullNumber] = useState(false);

  const masterCardImages = [MasterCard1, MasterCard2, MasterCard3];
  const amExCardImages = [AmExCard1, AmExCard2, AmExCard3];
  const visaCardImages = [VisaCard1, VisaCard2, VisaCard3];

  const getCardImage = (cardNumber) => {
    const firstDigit = cardNumber[0];
    const secondDigit = parseInt(cardNumber[1], 10);
    const imageIndex = secondDigit % 3;

    if (['1', '2', '5'].includes(firstDigit)) {
      return masterCardImages[imageIndex];
    } if (['3', '6', '8'].includes(firstDigit)) {
      return amExCardImages[imageIndex];
    } if (['4', '7', '9'].includes(firstDigit)) {
      return visaCardImages[imageIndex];
    }
    return visaCardImages[0];
  };

  const displayNumber = showFullNumber
    ? `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)} ${number.slice(12, 16)}`
    : `**** **** **** ${number.slice(-4)}`;

  return (
    <ImageBackground source={getCardImage(number)} style={styles.card}>

      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.cardNumber}>{displayNumber}</Text>
          <Text>
            exp:
            {expiry}
          </Text>
        </View>

        <TouchableOpacity onPress={() => setShowFullNumber(!showFullNumber)} style={styles.eyeButton}>
          <Icon name={showFullNumber ? 'eye-slash' : 'eye'} size={20} color="#fff" />
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    borderRadius: 10,
    height: 200,
    margin: 10,
    padding: 20,
    width: 300,
  },

  cardInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 110,
  },

  cardNumber: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },

  eyeButton: {
    marginBottom: 30,
  },
});

export default DebitCard;
