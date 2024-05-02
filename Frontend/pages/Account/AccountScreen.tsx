import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import DebitCard from "../Cards/DebitCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getWalletCards, getMerchant, getUser } from "../../api/api";
import Icon from "react-native-vector-icons/FontAwesome";

const AccountScreen = ({ navigation, route }) => {
  const [cards, setCards] = useState([]);
  const { account } = route.params;
  const [loggedAccount, setLoggedAccount] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);

  const fetchAccountInfo = async () => {
    if (account.account_type === "user") {
      try {
        const response = await getUser(account.account_id);
        setLoggedAccount(response.first_name);
      } catch (error) {
        console.error("Get User error:", error);
      }
    } else if (account.account_type === "merchant") {
      try {
        const response = await getMerchant(account.account_id);
        setLoggedAccount(response.company_name);
      } catch (error) {
        console.error("Get Merchant error:", error);
      }
    }
  };

  const fetchCards = async () => {
    try {
      const response = await getWalletCards(account.wallet.wallet_id);
      setCards(response);
    } catch (error) {
      console.error("Get Cards error:", error);
    }
  };

  const _renderItem = ({ item, index }) => {
    return <DebitCard number={item.card_number} expiry={item.card_expiry} />;
  };

  useEffect(() => {
    fetchCards();
    fetchAccountInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <Text style={styles.titleText}>Welcome, {loggedAccount}!</Text>
        {cards.length === 0 ? (
          <View style={styles.noCardContainer}>
            <Text style={styles.noCardText}>No card found</Text>
          </View>
          
        ) : (
          <Carousel
            layout={"default"}
            data={cards}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={300}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        )}

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddCard", { account, fetchCards })
            }
          >
            <Icon name={"plus-square-o"} size={40} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonColor="#ffffff"
            textColor="#000000"
            onPress={() => navigation.navigate("QRScan")}
          >
            <Text style={styles.boldText}>QR Code Scan</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
  centerView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 30,
  },
  infoText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  iconContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    margin: 20,
    width: 200,
    marginTop: 50,
  },
  noCardContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 150,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCardText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AccountScreen;
