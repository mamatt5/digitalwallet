import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type props = {
  cardText: string;
  icon: string
};

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    borderTopColor: '#FFFFFF',
    borderTopWidth: 1,
  },
  cardText: {
    color: 'white',
    paddingLeft: 10
  }
});

function UserMenuCard({ props }) {
  return (
    <View style={styles.cardContainer}>
      <MaterialIcon
        name={props.icon}
        color='#FFFFFF'
        size={20}
      />
      <Text style={styles.cardText}>
        {props.cardText}
      </Text>
    </View>
  );
}

export default UserMenuCard;
