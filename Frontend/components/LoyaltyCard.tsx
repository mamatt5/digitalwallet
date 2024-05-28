import React from 'react';
import {
  View, Text, ImageBackground, StyleSheet, Dimensions,
} from 'react-native';
import Barcode from '@kichiyaki/react-native-barcode-generator';

import LoyaltyCardImage1 from '../assets/LoyaltyCard1.jpg';
import LoyaltyCardImage2 from '../assets/LoyaltyCard2.jpg';
import LoyaltyCardImage3 from '../assets/LoyaltyCard3.jpg';

const { width, height } = Dimensions.get('window');
const scale = width / 320;

function LoyaltyCard({ loyaltyCard }) {
  const { card_number, member_name, card_expiry } = loyaltyCard;

  const getImage = () => {
    const index = card_number % 3;

    switch (index) {
      case 0: return LoyaltyCardImage1;
      case 1: return LoyaltyCardImage2;
      case 2: return LoyaltyCardImage3;
      default:
        return LoyaltyCardImage1;
    }
  };

  return (
    <View style={styles.card}>
      <ImageBackground source={getImage()} style={styles.backgroundImage} resizeMode="cover">
        <Text style={styles.cardNumber}>{card_number}</Text>
        <Barcode value={card_number} format="CODE128" width={1.30} maxWidth={300} height={50} style={styles.barcode} />
        <Text style={styles.memberName}>{member_name}</Text>
        <Text style={styles.expiryDate}>
          Expires:
          {card_expiry}
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  barcode: {
    alignSelf: 'center',
    marginTop: 15,
  },
  card: {
    borderRadius: 10,
    height: 200,
    marginVertical: 10,
    overflow: 'hidden',
    width: '100%',
  },
  cardNumber: {
    color: '#000000',
    fontSize: 10,

    left: 10,
    position: 'absolute',
    top: 5,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  expiryDate: {
    bottom: 5,
    color: '#000000',
    fontSize: 12,
    position: 'absolute',
    right: 10,
  },
  memberName: {
    bottom: 5,
    color: '#000000',
    fontSize: 12,
    left: 10,
    position: 'absolute',
  },
});

export default LoyaltyCard;
