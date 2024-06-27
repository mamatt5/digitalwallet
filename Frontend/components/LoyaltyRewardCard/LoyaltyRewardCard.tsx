import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import ColesLogo from '../../assets/ColesLogo.png';
import WoolworthsLogo from '../../assets/WoolworthsLogo.png';
import RedBalloonLogo from '../../assets/RedBalloonLogo.png';
import MaccasLogo from '../../assets/MaccasLogo.jpg';
import KfcLogo from '../../assets/KfcLogo.png';




type itemDetails = {
    rewardPrice: number,
    rewardNumber: number
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '50%',
        backgroundColor: "#696087",
        height: 100,
        overflow: 'hidden'
    },
    cardImage: {
      height: '50%',
      width: '50%',
      position: 'absolute'
    },
    pointContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
      width: '100%',
      height: '30%',
      position: 'absolute',
      bottom: 0,
      opacity: 0.7
    },
    valueContainer: {
      position: 'absolute',
      height: '50%',
      width: '50%',
      left: -50,
      top: -50,
      backgroundColor: '#000000',
      opacity: 0.7,
      transform: [
        {rotate: '45deg'}
      ]
    },
    valueText: {
      position: 'absolute',
      top: 5,
      left: 5,
      color: '#ffffff',
      fontSize: 20,
    },
});

function processLogo(rewardNumber) {
  
  switch (rewardNumber) {
    case 1: 
      return ColesLogo
    case 2: 
      return WoolworthsLogo
    case 3: 
      return MaccasLogo
    case 4: 
      return KfcLogo
    default: 
      return RedBalloonLogo
  }
}

function LoyaltyRewardCard({itemDetails}) {
  return (
    <View style={styles.cardContainer}>
      <Image source={processLogo(itemDetails.rewardNumber)} style={styles.cardImage}/>
      <View style={styles.valueContainer}></View>
      <Text style={styles.valueText}>${itemDetails.rewardPrice / 100}</Text>
    </View>
  );
}

export default LoyaltyRewardCard;
