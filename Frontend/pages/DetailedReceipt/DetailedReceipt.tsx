import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailedItemCard from "../../components/DetailedItemCard/DetailedItemCard";
import { getItems, getMerchant, getCard } from "../../api/api";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function DetailedReceiptsScreen({ navigation, route }) {
  const { account, transaction } = route.params;
  const [items, setItems] = useState([]);
  const [vendor, setVendor] = useState("");
  const [card, setCard] = useState("");

  const fetchItems = async () => {
    try {
      const items = await getItems(transaction.transaction_id);
      setItems(items);
    } catch (error) {
      console.error("Get Items error:", error);
    }
  };

  const fetchMerchant = async () => {
    try {
      const merchant = await getMerchant(transaction.vendor);
      setVendor(merchant.company_name);
    } catch (error) {
      console.error("Get Merchant error:", error);
    }
  };

  const fetchCard = async () => {
    try {
      const response = await getCard(transaction.card_id);
      setCard(response.card_number);
    } catch (error) {
      console.error("Get Card error:", error);
    }
  };

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
            year: "numeric",
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
          <MaterialIcon name="shopping" size={50 * scale} color="#FFFFFF" />
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
            <Text style={styles.cardHeaderTotal}>
              Total ({items.reduce((total, item) => total + item.quantity, 0)}
              {items.reduce((total, item) => total + item.quantity, 0) > 1
                ? " items"
                : " item"}
              )
            </Text>
            <Text style={styles.cardHeaderPrice}>${transaction.amount}</Text>
          </View>

          <View>
            <Text style={styles.gstHeader}>#GST</Text>
            <Text style={styles.gstPrice}>
              ${(transaction.amount / 11).toFixed(2)}
            </Text>
          </View>

          <View>
            <Text style={styles.gstHeader}>#excl. GST</Text>
            <Text style={styles.gstPrice}>
              ${(transaction.amount / 1.1).toFixed(2)}
            </Text>
          </View>
          <View style={styles.paymentHeader}>
            <Text style={styles.paymentText}>Payment</Text>
          </View>
          <View style={styles.cardContainer}>
            <Icon name={getCardLogo(card)} size={30} color="#FFFFFF" />
            <Text style={styles.cardNumberText}>
              Card ending in **{card.slice(-4)}
            </Text>
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
    marginHorizontal: 15 * scale,
    marginTop: 10 * scale,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonContainer: {
    width: 50 * scale,
    position: "absolute",
    left: 0,
  },
  ShareButtonContainer: {
    width: 50 * scale,
    position: "absolute",
    right: 0,
  },
  transactionDate: {
    color: "#FFFFFF",
    fontSize: 20 * scale,
  },
  vendorDetailsContainer: {
    marginHorizontal: 10 * scale,
    marginTop: 20 * scale,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  vendorIconContainer: {
    backgroundColor: "#aba6bc",
    borderRadius: 100,
    height: 70 * scale,
    width: 70 * scale,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  VendorName: {
    color: "#FFFFFF",
    fontSize: 20 * scale,
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 15 * scale,
  },
  itemContainer: {
    backgroundColor: "#696087",
    height: 235 * scale,
    borderRadius: 20 * scale,
    marginHorizontal: 30 * scale,
    marginTop: 15 * scale,
  },
  item: {
    margin: 10 * scale,
  },
  itemContainerHeader: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  itemScrollContainer: {
    height: 200 * scale,
  },
  cardDetailsContainer: {
    backgroundColor: "#696087",
    height: 125 * scale,
    borderRadius: 20,
    marginHorizontal: 30 * scale,
    marginTop: 15 * scale,
  },
  barcodeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#696087",
    height: 100 * scale,
    borderRadius: 20,
    marginHorizontal: 30 * scale,
    marginTop: 15 * scale,
  },
  barcodeStyle: {
    height: 80 * scale,
    width: 200 * scale,
  },
  cardHeaderText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardHeaderTotal: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13 * scale,
  },
  cardHeaderPrice: {
    color: "#FFFFFF",
    fontWeight: "bold",
    position: "absolute",
    right: 0,
    fontSize: 15 * scale,
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
    marginTop: 15 * scale,
  },
  paymentText: {
    color: "#FFFFFF",
    fontSize: 13 * scale,
    fontWeight: "bold",
  },
  cardDetails: {
    margin: 10 * scale,
  },
  cardImage: {
    marginTop: 10 * scale,
    height: 40 * scale,
    width: 60 * scale,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardNumberText: {
    color: "#FFFFFF",
    marginLeft: 5 * scale,
  },
});

export default DetailedReceiptsScreen;
