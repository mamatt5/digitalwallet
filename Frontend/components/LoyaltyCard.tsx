import React from 'react';
import {
  View, Text, ImageBackground, StyleSheet,
} from 'react-native';

import LoyaltyCardImage1 from '../assets/LoyaltyCard1.jpg';
import LoyaltyCardImage2 from '../assets/LoyaltyCard2.jpg';
import LoyaltyCardImage3 from '../assets/LoyaltyCard3.jpg';

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
    <ImageBackground source={getImage()} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardNumber}>{card_number}</Text>
        <Text style={styles.memberName}>{member_name}</Text>
        {card_expiry && (
        <Text style={styles.expiry}>
          Expires:
          {card_expiry}
        </Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    justifyContent: 'flex-end',
    margin: 10,
    padding: 20,
  },
  cardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expiry: {
    color: 'red',
    fontSize: 14,
  },
  memberName: {
    color: 'navy',
    fontSize: 16,
  },
});

export default LoyaltyCard;
