import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailedItemCard from "../../components/DetailedItemCard/DetailedItemCard";
import { getItems, getMerchant, getCard } from "../../api/api";
import Icon from "react-native-vector-icons/FontAwesome";

function DetailedReceiptsScreen({ navigation, route }) {
  const { account, transaction } = route.params;
  const [items, setItems] = useState([]);
  const [vendor, setVendor] = useState("");
  const [card, setCard] = useState("");

  // console.log("detailed transaction: ", transaction);

  const fetchItems = async () => {
    try {
      const items = await getItems(transaction.transaction_id);
      console.log("items: ", items);
      setItems(items);
    } catch (error) {
      console.error("Get Items error:", error);
    }
  };

  const fetchMerchant = async () => {
    try {
      const merchant = await getMerchant(transaction.vendor);
      setVendor(merchant.company_name)
    } catch (error) {
      console.error("Get Merchant error:", error);
    }
  }

  const fetchCard = async () => {
    try {
      const response = await getCard(transaction.card_id);
      console.log("card response: ", response)
      setCard(response.card_number);
    } catch (error) {
      console.error("Get Card error:", error);
    }
  }

  useEffect(() => {
    fetchItems();
    fetchMerchant();
    fetchCard();
  }, [transaction]);

  const convertDate = (date) => {
    const [day, month, year] = date.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

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

  const date = convertDate(transaction.date);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButtonContainer}
          onPress={() => navigation.navigate("ReceiptsScreen", { account })}
        >
          <MaterialIcon name="chevron-left" size={50} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.transactionDate}>
          {new Date(date).toLocaleDateString(undefined, {
            year: "2-digit",
            month: "short",
            day: "2-digit",
          })}
        </Text>
        <Pressable style={styles.ShareButtonContainer}>
          <MaterialIcon name="share-variant" size={30} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.vendorDetailsContainer}>
        <View style={styles.vendorIconContainer}>
          <MaterialIcon name="shopping" size={80} color="#FFFFFF" />
        </View>
        <Text style={styles.VendorName}>{vendor}</Text>
        <Text style={styles.timeText}>Time: {transaction.time}</Text>
      </View>

      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.itemContainerHeader}>Details</Text>

          <ScrollView style={styles.itemScrollContainer}>
            {items.map((item, index) => (
              <DetailedItemCard
              key={index}
                itemDetails={{
                  itemName: item.name,
                  itemAmount: item.quantity,
                  unitPrice: item.price,
                }}
              ></DetailedItemCard>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.cardDetailsContainer}>
        <View style={styles.cardDetails}>
          <View style={styles.cardHeaderText}>
            <Text style={styles.cardHeaderTotal}>Total({items.length} {items.length > 1 ? "items" : "item"})</Text>
            <Text style={styles.cardHeaderPrice}>${(transaction.amount/1.1).toFixed(2)}</Text>
          </View>
          <View style={styles.cardHeaderText}>
            <Text style={styles.gstHeader}>#Total includes GST</Text>
            <Text style={styles.gstPrice}>${(transaction.amount/11).toFixed(2)}</Text>
          </View>
          <View style={styles.paymentHeader}>
            <Text style={styles.paymentText}>Payment</Text>
          </View>
          <View style={styles.cardContainer}>
            <Icon name={getCardLogo(card)} size={30} color="#FFFFFF" />
            <Text style={styles.cardNumberText}>Card ending in **{card.slice(-4)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
  headerContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonContainer: {
    width: 50,
    position: "absolute",
    left: 0,
  },
  ShareButtonContainer: {
    width: 50,
    position: "absolute",
    right: 0,
  },
  transactionDate: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  vendorDetailsContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  vendorIconContainer: {
    backgroundColor: "#aba6bc",
    borderRadius: 100,
    height: 100,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  VendorName: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  itemContainer: {
    backgroundColor: "#696087",
    height: 290,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 15,
  },
  item: {
    margin: 10,
  },
  itemContainerHeader: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  itemScrollContainer: {
    height: 150,
  },
  cardDetailsContainer: {
    backgroundColor: "#696087",
    height: 150,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 15,
  },
  barcodeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#696087",
    height: 100,
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 15,
  },
  barcodeStyle: {
    height: 80,
    width: 200,
  },
  cardHeaderText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardHeaderTotal: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  cardHeaderPrice: {
    color: "#FFFFFF",
    fontWeight: "bold",
    position: "absolute",
    right: 0,
    fontSize: 20,
  },
  gstHeader: {
    color: "#FFFFFF",
  },
  gstPrice: {
    color: "#FFFFFF",
    position: "absolute",
    right: 0,
  },
  paymentHeader: {
    marginTop: 25,
  },
  paymentText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  cardDetails: {
    margin: 10,
  },
  cardImage: {
    marginTop: 10,
    height: 40,
    width: 60,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardNumberText: {
    color: "#FFFFFF",
    marginLeft: 5,
  },
});

export default DetailedReceiptsScreen;
