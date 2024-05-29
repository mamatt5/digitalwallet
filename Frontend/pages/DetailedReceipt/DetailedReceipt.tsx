import React, { useState } from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet, Image,Alert, Pressable} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import DetailedItemCard from '../../components/DetailedItemCard/DetailedItemCard';
import Barcode from '../../assets/Barcode.png';
import VisaCard from '../../assets/VisaCard.png';


function DetailedReceiptsScreen({ navigation }) {

    function generateRandomNumber() {
        return Math.floor(Math.random() * (99 - 1 + 1)) + 1; 
    }


const transaction = useRoute().params?.transaction
const date = moment(transaction.transactionDate)
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Pressable style={styles.backButtonContainer} onPress={() => navigation.navigate('Receipts')}>
                <MaterialIcon
                name='chevron-left'
                size={50}
                color="#FFFFFF"
                />
            </Pressable>
            <Text style={styles.transactionDate}>
                {date.format('DD MMM YYYY')}
            </Text>
            <Pressable style={styles.ShareButtonContainer}>
                <MaterialIcon
                name='share-variant'
                size={30}
                color="#FFFFFF"
                />
            </Pressable>
        </View>
        <View style={styles.vendorDetailsContainer}>
            <View style={styles.vendorIconContainer}>
                <MaterialIcon
                name='shopping'
                size={80}
                color="#FFFFFF"
                />
            </View>
            <Text style={styles.VendorName}>
                {transaction.vendorName}
            </Text>
            <Text style={styles.timeText}>
                Time: {date.format('LT')}
            </Text>
        </View>
        <View style={styles.itemContainer}>
            <View style={styles.item}>  
            <Text style={styles.itemContainerHeader}>Details</Text>
                <ScrollView style={styles.itemScrollContainer}>
                <DetailedItemCard itemDetails={{itemName: 'Item1', itemAmount: 1, price:generateRandomNumber() + '.' + generateRandomNumber()}}></DetailedItemCard>
                <DetailedItemCard itemDetails={{itemName: 'Item2', itemAmount: 2, price:generateRandomNumber() + '.' + generateRandomNumber()}}></DetailedItemCard>
                <DetailedItemCard itemDetails={{itemName: 'Item3', itemAmount: 1, price:generateRandomNumber() + '.' + generateRandomNumber()}}></DetailedItemCard>
                <DetailedItemCard itemDetails={{itemName: 'Item4', itemAmount: 4, price:generateRandomNumber() + '.' + generateRandomNumber()}}></DetailedItemCard>
                <DetailedItemCard itemDetails={{itemName: 'Item5', itemAmount: 3, price:generateRandomNumber() + '.' + generateRandomNumber()}}></DetailedItemCard>
                <DetailedItemCard itemDetails={{itemName: 'Item6', itemAmount: 1, price:generateRandomNumber() + '.' + generateRandomNumber()}}></DetailedItemCard>
                </ScrollView>
            </View>
        </View>
        <View style={styles.cardDetailsContainer}>
            <View style={styles.cardDetails}>
                <View style={styles.cardHeaderText}>
                    <Text style={styles.cardHeaderTotal}>Total(6 Items)</Text>
                    <Text style={styles.cardHeaderPrice}>$97.40</Text>
                </View>
                <View style={styles.cardHeaderText}>
                    <Text style={styles.gstHeader}>#Total includes GST</Text>
                    <Text style={styles.gstPrice}>$4.87</Text>
                </View>
                <View style={styles.paymentHeader}>
                    <Text style={styles.paymentText}>Payment</Text>
                </View>
                <View style={styles.cardContainer}>
                    <Image source={VisaCard} style={styles.cardImage}/>
                    <Text style={styles.cardNumberText}>Card ending in *123</Text>
                </View>
            </View>
        </View>
        <View style={styles.barcodeContainer}>
            <Image source={Barcode} style={styles.barcodeStyle}/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f003f', 
    height: 2000
  },
  headerContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonContainer: {
    width: 50,
    position: 'absolute',
    left: 0
  },
  ShareButtonContainer: {
    width: 50,
    position: 'absolute',
    right: 0
  },
  transactionDate: {
      color: '#FFFFFF',
      fontSize: 20
  },
  vendorDetailsContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  vendorIconContainer: {
    backgroundColor: '#aba6bc',
    borderRadius: 100,
    height: 100,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  VendorName: {
      color: '#FFFFFF',
      fontSize: 30
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 15
  },
  itemContainer: {
    backgroundColor: '#696087',
    height: 200,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 15,
  },
  item: {
    margin: 10,
  },
  itemContainerHeader: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  itemScrollContainer: {
      height: 150
  },
  cardDetailsContainer: {
    backgroundColor: '#696087',
    height: 150,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 15
  },
  barcodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#696087',
    height: 100,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 15
  },
  barcodeStyle: {
      height: 80,
      width: 200,
  },
  cardHeaderText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderTotal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20
  },
  cardHeaderPrice: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
    fontSize: 20
  },
  gstHeader: {
    color: '#FFFFFF',
  },
  gstPrice: {
    color: '#FFFFFF',
    position: 'absolute',
    right: 0,
  },
  paymentHeader: {
    marginTop: 10
  },
  paymentText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold'
  },
  cardDetails: {
    margin: 10,
  },
  cardImage: {
      marginTop: 10,
      height: 40,
      width: 60
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumberText: {
    color: '#FFFFFF',
    marginLeft: 5
  }
});

export default DetailedReceiptsScreen;
