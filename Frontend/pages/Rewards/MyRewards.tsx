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

}

  useEffect(() => {
    getVouchers()
  }, [refresh]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState({
    company_name: "company_name",
    discount: "discount",
    description: "description",
    price: "price",
    voucher_id: "voucher_id"
  })


  const openModal = (e) => {
    setSelectedVoucher(e)
    setModalVisible(true);
    return e
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const renderVoucherItem = ({ item }) => (
    // <View style={[styles.itemContainer, { width: itemWidth }]}>
    //   <Text style={styles.itemText}>Voucher ID: {item.id}</Text>
    //   <Text style={styles.itemText}>Price: ${item.price}</Text>
    // </View>
    <View style={styles.itemContainer}>
      <VoucherCard itemDetails={item} openModal={openModal}></VoucherCard>
    </View>
  )

    return(

      <SafeAreaView style={styles.container}>
      {vouchers.length > 0 ? (
                    <FlatList
                      data={vouchers}
                      renderItem={renderVoucherItem}
                      numColumns={3}
                      contentContainerStyle={styles.flatListContainer}
                      
                    />) : null }


    <Modal visible={modalVisible}  transparent={true}>
              <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                  
                    <Text style={styles.titleText}>{selectedVoucher.company_name} Discount Voucher</Text>
                    <Text style={styles.subheading}>Amount: {selectedVoucher.discount}%</Text>
                    <Text style={styles.subheading}>Description: {selectedVoucher.description}</Text>
                    <Text style={styles.subheading}>Price: {selectedVoucher.price}</Text>
                    
                    
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f003f",
    flex: 1
  },
 
  itemContainer: {
  
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  pointsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  companyContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerContainer: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    
  },
  companyName: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ffffff', // Set color to white
  },
  flatListContainer: {
    justifyContent: 'space-between',
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
    paddingLeft: 55
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    width: '40%',
    margin: 15,
    height: 30,
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
    height: 500,

    paddingHorizontal: 20,
    paddingVertical: 20,
    },
  row: {
    flexDirection: "row"
  },
  col:  {
    flex:  1,
    margin: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '80%', // Adjust the width of the modal content
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35, // Adjust as needed
    fontWeight: 'bold', // Make it bold
    marginBottom: 8, // Optional: Add spacing between this and the next text
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  getVoucher: {
    marginTop: 20
    
  }
});


export default MyRewards