import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Carousel from 'react-native-snap-carousel';
import DebitCard from '../Cards/DebitCard';
import { TouchableOpacity } from "react-native-gesture-handler";
import { getWalletCards } from "../../api/api";
import Icon from "react-native-vector-icons/FontAwesome";

const AccountScreen = ({ navigation, route }) => {

  const [cards, setCards] = useState([]);
  const { account } = route.params;

  const [activeIndex, setActiveIndex] = useState(0);

  const fetchCards = async () => {
    try {
      const response = await getWalletCards(account.wallet.wallet_id);
      setCards(response);
    } catch (error) {
      console.error("Get Cards error:", error);
    }
  }
  
  const _renderItem = ({item, index}) => {
    return (
      <DebitCard number={item.card_number} expiry={item.card_expiry} />
    );
  }

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    console.log(cards[activeIndex]);}, [activeIndex, cards]);

  return (
    <SafeAreaView style={{ backgroundColor: "#0f003f", height: 2000 }}>
      <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold", marginVertical: 30 }}>Account Information</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}><Text style={{ fontWeight: "bold" }}>Account ID:</Text> {account.account_id}</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}><Text style={{ fontWeight: "bold" }}>Email:</Text> {account.email}</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 10 }}><Text style={{ fontWeight: "bold" }}>Phone Number:</Text> {account.phone_number}</Text>
        <Text style={{ color: "#ffffff", fontSize: 18, marginBottom: 20 }}><Text style={{ fontWeight: "bold" }}>Account Type:</Text> {account.account_type}</Text>

        <Carousel
          layout={"default"}
          data={cards}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveIndex(index)}
        />

        <View style={{marginTop: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate("AddCard", { account, fetchCards })}>
            <Icon name={"plus-square-o"} size={40} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ margin: 20, width: 200, marginTop: 50 }}>
          <Button buttonColor="#ffffff" textColor="#000000" onPress={() => navigation.navigate("QRScan")}>
            <Text style={{ fontWeight: "bold" }}>QR Code Scan</Text>
          </Button>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;