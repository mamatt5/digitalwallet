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
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
import { updateAPPoints } from "../../api/api";
import ColesLogo from '../../assets/ColesLogo.png';
import WoolworthsLogo from '../../assets/WoolworthsLogo.png';
import LoraLogo from '../../assets/LoraLogo.png';

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function VoucherScreen({ navigation, route }) {
  const [refresh, setRefresh] = useState(false);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  const { account } = route.params;
  const [walletPoints, setWalletPoints] = useState(0);


    const fetchWalletPoints = async () => {
      try {
        const response = await getAPPoints(account.wallet.wallet_id);
        setWalletPoints(response);
      } catch (error) {
        console.error("Get Wallet Points error:", error);
      }
    }
   
    const getMerchantAndVouchers = async () => {
        
      let allMerchantsAndVouchers = []
      // Gets all merchants
      try {
        allMerchantsAndVouchers = await getAllMerchantsAndVouchers();
        setMerchants(allMerchantsAndVouchers)
        } catch (error) {
          console.error("Get All Vouchers error:", error);
        }

  }
  const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      fetchWalletPoints();
      getMerchantAndVouchers();
    }, [refresh]);


  const { width } = Dimensions.get('window');
  const itemWidth = width / 3;

 
  const [selectedVoucher, setSelectedVoucher] = useState({
    merchant_name: "company_name",
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
    <View style={styles.itemContainer}>
      <VoucherCard itemDetails={item} openModal={openModal}></VoucherCard>
    </View>

    
    
  );

  function processLogo(merchant_name) {
    console.log(merchant_name);
    switch (merchant_name) {
      case "Lora's Cafe": 
        return LoraLogo
      case "Coles": 
        return ColesLogo
      case "Woolworths": 
        return WoolworthsLogo
      default: 
        return null
    }
  }

  const merchantsWithVouchers = merchants.filter(item => item.vouchers.length > 0);

  const getVoucher = async() => {
    let voucher_price = parseInt(selectedVoucher.price, 10)
    // actual version
    if (walletPoints >= voucher_price && walletPoints > 0) {

    // version used for testing, as ap points are only generate through pos transactions
    // if (walletPoints < voucher_price && voucher_price != 2000) {

      try {
      console.log(account)
      await AddVoucherToUser(account.account_id, selectedVoucher.voucher_id);
      setModalVisible(false)
      updateAPPoints(account.wallet.wallet_id, '-'+selectedVoucher.price)
      Alert.alert("Success", "You have bought a voucher!")
      } catch (error) {
        console.error("Add voucher to user  error:", error);
      }

    } else {
      Alert.alert("Invalid amount of points", "You have don't enough AP Points for this discount")
    }

  };

  return (
    <SafeAreaView style={styles.container}>

    
      <View style={styles.contentContainer}>
        <Text style={styles.pointsContainer}>PayPath Points: {walletPoints} <Icon name="star" size={15 * scale} color="#fff" /> </Text>
   
  
        <View style={styles.loyaltyCardContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
        {merchantsWithVouchers.map((merchant, index) => (
          <View key={index} style={styles.companyContainer}>
            <Text style={styles.companyName}>{merchant.company_name}</Text>
            <ScrollView horizontal>
              {merchant.vouchers.length > 0 ? (
                <FlatList
                  data={merchant.vouchers}
                  renderItem={renderVoucherItem}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.flatListContainer}
                />
              ) : null}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

    
        </View>
        
        <Modal visible={modalVisible}  transparent={true}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>

              {/* <View style={styles.modalImageContainer}>
                <Image source={processLogo(selectedVoucher.merchant_name)} style={styles.modalImage}/>
              </View> */}
              <View style={styles.modalBody}>
                <Text style={styles.subheading}>{selectedVoucher.merchant_name}</Text>
                <Text style={styles.titleText}>{selectedVoucher.description}</Text>
                <Text style={styles.subheading}>{selectedVoucher.price} PayPath Points <Icon name="star" size={15 * scale} color="#fff" /> </Text>
              </View>
              <TouchableWithoutFeedback onPress={getVoucher}>
                <View style={styles.getVoucher}>
                  <Text style={styles.getVoucherText}>Get Voucher</Text>
                </View>
              </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f003f",
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center', // centers horizontally
  },

  centre: {
    flex: 1,
    justifyContent: 'center', // centers vertically
    alignItems: 'center', // centers horizontally
  },
 
  itemContainer: {
  
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },

  pointsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20 * scale,
    fontWeight: "bold",
    color: '#ffffff',
    paddingBottom: 10,
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
    color: '#ffffff',
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
    alignItems: "center",
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
    height: 30,
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
    backgroundColor: '#696087',
    width: '80%', // Adjust the width of the modal content
    borderRadius: 10,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 35, // Adjust as needed
    fontWeight: 'bold', // Make it bold
  },
  subheading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  getVoucher: {
    marginTop: 5,
    padding: 20,
    borderTopWidth: 1,
    width: '100%',
    borderTopColor: '#FFFFFF',
    alignContent:'center',
    justifyContent: 'center'
  },
  getVoucherText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'condensedBold'
  },
  modalImageContainer: {
    width: '100%',
    minHeight: 200,
    objectFit: 'contain',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: 'hidden'
  },
  modalImage: {
    width: '100%',
    height: '100%'
  },
  modalBody: {
    padding: 20
  }

});

export default VoucherScreen;
