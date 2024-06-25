import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";

import RewardTabs from "../../components/CardFilterTabs/RewardTabs";
import BrowseRewards from "./BrowseRewards";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function RewardsScreen({navigation, route}) {

    const [activeTabIndex, setActiveTabIndex] = useState(0);



    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Rewards</Text>
          <View style={styles.profileButton}>
          </View>
        </View>

        <RewardTabs
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />

        {activeTabIndex === 0 ? (
            <View style={styles.noTransactionsContainer}>
              <Text style={styles.noCardText}>Browse REwards</Text>
              <BrowseRewards ></BrowseRewards>
            </View>
          ) : (
            <View style={styles.noTransactionsContainer}>
            <Text style={styles.noCardText}>My rewards</Text> 
          </View>
          )}


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

export default RewardsScreen;