import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const SmallDebitCard = ({ card }) => {
  const { card_number: number, card_expiry: expiry } = card;

  const getCardLogo = (number) => {
    switch (number[0]) {
      case "1":
      case "2":
      case "5":
        return "cc-mastercard";

      case "3":
      case "6":
      case "8":
        return "cc-amex";

      case "4":
      case "7":
      case "9":
        return "cc-visa";

      default:
        return "cc-visa";
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Icon name={getCardLogo(number)} size={40} color="#fff" />

        <View>
            <Text style={styles.cardInfo}>Ending in **{number.slice(-4)}</Text>
            <Text style={styles.cardInfo}>exp: {expiry}</Text>
        </View>
      </View>
    </>
  );
};

export default SmallDebitCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  cardInfo: {
    marginLeft: 10,
    color: "#fff",
  }
});
