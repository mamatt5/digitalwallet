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
import { getItems, getMerchant, getCard, getAPPoints } from "../../api/api";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import LoyaltyRewardCard from "../../components/LoyaltyRewardCard/LoyaltyRewardCard";

function RewardsScreen({ navigation, route }) {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  const { account } = route.params;
  const [walletPoints, setWalletPoints] = useState(0);

    const Row = ({ children }) => (
        <View style={styles.row}>{children}</View>
      )

    const Col = ({ children }) => {
    return  (
        <View style={styles.col}>{children}</View>
    )
    }

    const fetchWalletPoints = async () => {
      try {
        const response = await getAPPoints(account.wallet.wallet_id);
        setWalletPoints(response);
      } catch (error) {
        console.error("Get Wallet Points error:", error);
      }
    }

    useEffect(() => {
      fetchWalletPoints();
    }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButtonContainer}
        >
          <MaterialIcon name="chevron-left" size={50} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.transactionDate}>
            Choose a reward
        </Text>
      </View>
        <View style={styles.textInputContainer}>
          <Ionicons style={styles.textInputIcon}name="search" size={15} color="#FFFFFF" />
          <TextInput style={styles.textInput} placeholder="Search" placeholderTextColor="white" />
        </View>
        <View style={styles.loyaltyCardContainer}>
        <Text style={styles.transactionDate}>Points: {walletPoints}</Text>
        <ScrollView style={styles.rewardCardContainer}>
      <Row>
        <Col>
            <LoyaltyRewardCard itemDetails={{rewardPrice: 500, rewardNumber: 1}}></LoyaltyRewardCard>
        </Col>
        <Col>
            <LoyaltyRewardCard itemDetails={{rewardPrice: 1000, rewardNumber: 1}}></LoyaltyRewardCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoyaltyRewardCard itemDetails={{rewardPrice: 2000, rewardNumber: 1}}></LoyaltyRewardCard>
        </Col>
        <Col>
        <LoyaltyRewardCard itemDetails={{rewardPrice: 500, rewardNumber: 2}}></LoyaltyRewardCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoyaltyRewardCard  itemDetails={{rewardPrice: 1000, rewardNumber: 2}}></LoyaltyRewardCard>
        </Col>
        <Col>
        <LoyaltyRewardCard  itemDetails={{rewardPrice: 2000, rewardNumber: 2}}></LoyaltyRewardCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoyaltyRewardCard itemDetails={{rewardPrice: 500, rewardNumber: 3}}></LoyaltyRewardCard>
        </Col>
        <Col>
        <LoyaltyRewardCard  itemDetails={{rewardPrice: 1000, rewardNumber: 3}}></LoyaltyRewardCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoyaltyRewardCard  itemDetails={{rewardPrice: 2000, rewardNumber: 3}}></LoyaltyRewardCard>
        </Col>
        <Col>
        <LoyaltyRewardCard  itemDetails={{rewardPrice: 500, rewardNumber: 4}}></LoyaltyRewardCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoyaltyRewardCard  itemDetails={{rewardPrice: 1000, rewardNumber: 4}}></LoyaltyRewardCard>
        </Col>
        <Col>
        <LoyaltyRewardCard  itemDetails={{rewardPrice: 2000, rewardNumber: 4}}></LoyaltyRewardCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoyaltyRewardCard  itemDetails={{rewardPrice: 500, rewardNumber: 5}}></LoyaltyRewardCard>
        </Col>
        <Col>
        <LoyaltyRewardCard  itemDetails={{rewardPrice: 1000, rewardNumber: 5}}></LoyaltyRewardCard>
        </Col>
      </Row>
    </ScrollView>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f003f",
    flex: 1
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
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    width: '85%',
    margin: 15,
    height: 30
  },
  textInputIcon: {
    paddingLeft: 10
  },
    textInput: {
    color: 'white',
    marginLeft: 10,
    height: 30,
    width: '100%'
  },
  loyaltyCardContainer: {
    marginHorizontal: 15
  },
  rewardCardContainer: {
    marginHorizontal: "auto",
    width: '100%', 
    height: 500
    },
  row: {
    flexDirection: "row"
  },
  col:  {
    flex:  1,
    margin: 5
  }
});

export default RewardsScreen;
