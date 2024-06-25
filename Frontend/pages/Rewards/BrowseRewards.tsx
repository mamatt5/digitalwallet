import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";

import RewardTabs from "../../components/CardFilterTabs/RewardTabs";
import { getAllMerchants } from "../../api/api";
import { getAllVouchersForMerchant } from "../../api/api";
import LoyaltyRewardCard from "../../components/LoyaltyRewardCard/LoyaltyRewardCard";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function BrowseRewards({navigation, route}) {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [merchants, setMerchants] = useState([]);

    const getMerchantAndVouchers = async () => {
        
        let allMerchants = []
        // Gets all merchants
        try {
            allMerchants = await getAllMerchants();
          } catch (error) {
            console.error("Get All Vouchers error:", error);
          }

        // for each merchant entry, finds all the list vouchers that belong to that merchant
        // then adds that list of voucher to the entry
        for (let i = 0; i < allMerchants.length; i++) {
          let vouchers = []
          let curr = allMerchants.at(i)
          try {
            vouchers = await getAllVouchersForMerchant(curr.account_id);
          } catch (error) {
            console.error("Get All Vouchers for Merchant error:", error);
          }
          curr.vouchers = vouchers;

        }
        console.log("final")
        setMerchants(allMerchants)
        console.log(allMerchants)

    }

    useEffect(() => {
        getMerchantAndVouchers();
      }, []);


    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>x
        
      <FlatList
        data={merchants}
        keyExtractor={(merchants) => merchants.id} // Assuming each item has a unique id
        renderItem={() => <LoyaltyRewardCard itemDetails={{rewardPrice: 2000, rewardNumber: 1}} />}
      />

        </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  centerView: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileButton: {
    marginLeft: 10 * scale,
  },
  container: {
    backgroundColor: "#0f003f",
    flex: 1,
  },
  iconContainer: {
    marginTop: 10,
  },
  noCardContainer: {
    alignItems: "center",
    borderColor: "#fff",
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 2,
    height: 150,
    justifyContent: "center",
    width: 250,
  },
  noCardText: {
    color: "#fff",
    fontSize: 20,
  },
  noTransactionsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    color: "#ffffff",
    fontSize: 20 * scale,
    fontWeight: "bold",
    marginVertical: 10,
  },
  pointsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pointsText: {
    color: "#ffffff",
    fontSize: 20 * scale,
    fontWeight: "bold",
    marginLeft: 10,
  },
  transactionContainer: {
    flex: 1,
    paddingHorizontal: 10 * scale,
  },
  transactions: {
    flex: 1,
  },
});

export default BrowseRewards;