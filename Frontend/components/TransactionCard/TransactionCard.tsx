import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type transaction = {
  vendorName: string;
  vendorType: 'consumables' | 'travel'
  transactionDate: string;
  amount: number;
};

const handleIcon = (vendorType) => {
  switch(vendorType) {
    case 'consumables':
      return "silverware-fork-knife"

    case 'travel':
      return "bag-suitcase"

    default:
      return "shopping-outline"
  }
};

const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderColor: 'white',
      borderStyle: 'dashed',
      paddingVertical: 15
    },
    pageContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
    },
    vendorIconContainer: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#aba6bc',
      height: 45,
      width: 45,
      borderRadius: 100,
      marginRight: 15
    },
    vendorIcon: {
      alignSelf: 'center'
    },
    vendorTitle: {
      color: 'white',
      fontSize: 18
    },
    dateContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    dateText: {
      color: 'white',
      fontSize: 14,
      alignSelf: 'center',
      marginHorizontal: 2
    },
    receipt: {
      color: 'white',
      fontSize: 14,
      alignSelf: 'center',
      marginHorizontal: 2
    },
    amountContainer: {
      position: 'absolute',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      height: '100%',
      right: 0
    },
    amountText: {
      color: 'white',
      fontSize: 15
    }
  });

const TransactionCard = ({transaction}) => { 
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Login")} style={styles.pageContainer}>
        {/*Vender Icon*/}
        <View style={styles.vendorIconContainer}>
          <Icon style={styles.vendorIcon}
            name={handleIcon(transaction.vendorType)}
            size={30}
            color='#0f003f'   
            />
        </View>

        {/*Vender Info*/}
        <View>
          <Text numberOfLines={1} style={styles.vendorTitle}>
            {transaction.vendorName ? transaction.vendorName : 'Unknown Vendor'}
          </Text>
          <View style={styles.dateContainer}>
            <Icon style={styles.dateText}
              name='receipt'
              size={12}
              color='#0f003f'   
              />
              <Text style={styles.dateText}>
                {transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric'}) : 'XX XXX XXXX'}
              </Text>
          </View>
        </View>
        {/*Transaction Amount*/}
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>${transaction.amount ? transaction.amount : '0'}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default TransactionCard;