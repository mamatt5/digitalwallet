import React from 'react';
import {View, StyleSheet, Text, Pressable,} from 'react-native';

type itemDetails = {
    itemName: string,
    itemAmount: number,
    unitPrice: number,
}

const styles = StyleSheet.create({
    itemAmountText: {
        color: '#FFFFFF',
    marginRight: 10
    },
    itemNameText: {
        color: '#FFFFFF'
    },
    itemPriceText: {
        color: '#FFFFFF',
        position: 'absolute',
        right: 0
    },
    itemCardContainer: {
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#FFFFFF',
    }
});

function DetailedItemCard({itemDetails}) {
    const price = itemDetails.itemAmount * itemDetails.unitPrice;
  return (
    <View style={styles.itemCardContainer}>
        <Text style={styles.itemAmountText}>
            {itemDetails.itemAmount}x
        </Text>
        <Text style={styles.itemNameText}>
            {itemDetails.itemName}
        </Text>
        <Text style={styles.itemPriceText}>
            ${(price).toFixed(2)}
        </Text>
    </View>
  );
}

export default DetailedItemCard;
