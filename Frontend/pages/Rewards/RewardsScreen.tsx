import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  KeyboardAvoidingView 
} from "react-native";

import RewardTabs from "../../components/CardFilterTabs/RewardTabs";
import VoucherScreen from "./BrowseRewardsScreen";
import MyRewards from "./MyRewards";

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
              <Text style={styles.noCardText}>Browse Rewards</Text>
              {/* <BrowseRewards></BrowseRewards>
              <Text style={styles.noCardText}>Browse Rewards</Text> */}
              <VoucherScreen navigation={navigation} route={route}></VoucherScreen>
            </View>
          ) : (
            <View style={styles.noTransactionsContainer}>
              <MyRewards navigation={navigation} route={route}></MyRewards> 
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

  top: {
    position: "absolute"
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
    minHeight: '80%'
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
  scrollContainer: {
    flexGrow: 1,
    padding: 20, // Adjust padding or margins to increase scrollable area
  },
});

export default RewardsScreen;