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



function MyRewards({ navigation, route }) {


    return(

        <>
        </>
    )
}

export default MyRewards