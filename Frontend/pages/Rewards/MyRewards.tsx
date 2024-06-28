import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailedItemCard from "../../components/DetailedItemCard/DetailedItemCard";
import { getItems, getMerchant, getCard, getAPPoints } from "../../api/api";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import LoyaltyRewardCard from "../../components/LoyaltyRewardCard/LoyaltyRewardCard";
import { getAllMerchantsAndVouchers } from "../../api/api";
import { FlatList } from "react-native";
import VoucherCard from "../../components/LoyaltyRewardCard/VoucherCard"; 
import { Modal } from "react-native";
import { Button } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { AddVoucherToUser } from "../../api/api";
import { getVouchersForUser } from "../../api/api";



function MyRewards({ navigation, route }) {
    const [refresh, setRefresh] = useState(false);
    const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  const { account } = route.params;
  const getVouchers = async () => {
        
    let allMerchantsAndVouchers = []
    // Gets all merchants
    try {
      let vouchers = await getVouchersForUser(account.account_id);
      setVouchers(vouchers)
      console.log("AYYAAY")
      console.log(vouchers)
      } catch (error) {
        console.error("Get Vouchers error:", error);
      }

    console.log(allMerchantsAndVouchers)

}

  useEffect(() => {
    getVouchers()
  }, [refresh]);


    return(

        <>

        </>
    )
}

export default MyRewards