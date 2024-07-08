import React from 'react';
import {View, StyleSheet, Text, Pressable, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import ColesLogo from '../../assets/ColesLogo.png';
import WoolworthsLogo from '../../assets/WoolworthsLogo.png';
import LoraLogo from '../../assets/LoraLogo.png';
import MaccasLogo from '../../assets/MaccasLogo.jpg';
import KfcLogo from '../../assets/KfcLogo.png';
import { useState } from 'react';
import { Modal } from 'react-native-paper';


const { width } = Dimensions.get('window');

type itemDetails = {
    rewardPrice: number,
    rewardNumber: number
}



function processLogo(companyId) {
  console.log(companyId);
  switch (companyId) {
    case 13: 
      return LoraLogo
    case 15: 
      return ColesLogo
    case 16: 
      return WoolworthsLogo
    default: 
      return null
  }
}





function VoucherCard({itemDetails, openModal}) {
    

    return (
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=>openModal(itemDetails)}>
          <View style={styles.roundedRectangle}>
            <Image source={processLogo(itemDetails.merchant_id)} style={styles.cardImage}/>
            <Text>{itemDetails.merchant_name}</Text>
          </View>
        </TouchableWithoutFeedback>
  
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Modal Content</Text>
                <Text>Tap anywhere to close</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal> */}
      </View>
      );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '50%',
        backgroundColor: "#696087",
        height: 100,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    cardImage: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 1,
      top:0,
      left:0,
      borderRadius: 20
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
    roundedRectangle: {
        width: width * 0.27,  // Example width
        height: width*0.24, // Example height
        backgroundColor: '#F0F0F0', // Example background color
        borderRadius: 20, // Example border radius for rounded corners
        borderWidth: 1, // Optional: add border width
        borderColor: '#CCCCCC', // Optional: border color
        justifyContent: 'center', // Optional: center content vertically
        alignItems: 'center', // Optional: center content horizontally
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
});

export default VoucherCard;