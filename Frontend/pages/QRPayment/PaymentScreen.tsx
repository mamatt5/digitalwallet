import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Vibration,
  Alert,
  RefreshControlBase,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import {
  getWalletCards,
  addTransaction,
  addAPPoints,
  checkTransaction,
} from "../../api/api";
import SmallDebitCard from "../../components/SmallDebitCard";
import { ScrollView } from "react-native-gesture-handler";
import { getVouchersForUser } from "../../api/api";
import VoucherCard from "../../components/LoyaltyRewardCard/VoucherCard";
import { Modal } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { deleteVoucherForUser } from "../../api/api";
import { getVouchersForUserAndMerchant } from "../../api/api";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function PaymentScreen({ route, navigation }) {
  const [refresh, setRefresh] = useState(false);
  const { data, account } = route.params;
  const [cards, setCards] = useState([]);
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);
  const [isValidQR, setIsValidQR] = useState(false);
  const [parsedData, setParsedData] = useState("");
  const [selectedCard, setSelectedCard] = useState(-1);
  const [useLoyaltyCard, setUseLoyaltyCard] = useState(false);
  const [userVouchers, setUserVouchers] = useState([]);
  const [voucherScreen, setVoucherScreen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVoucherModalVisible, setConfirmVoucherModalVisible] = useState(false)
  const [discount, setDiscount] = useState(1)

  const [selectedVoucher, setSelectedVoucher] = useState({
    merchant_name: "company_name",
    discount: 0,
    description: "description",
    price: "price",
    voucher_id: "voucher_id"
  })


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigation]);

  const fetchCards = async () => {
    try {
      const response = await getWalletCards(account.wallet.wallet_id);
      console.log(response);
      setCards(response);
    } catch (error) {
      console.error("Get Cards error:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    try {
      const parsed = JSON.parse(data);

      if (
        parsed.merchant &&
        parsed.amount &&
        parsed.wallet_id &&
        parsed.account_id
      ) {
        setIsValidQR(true);
        setParsedData(parsed);
        handleVouchers(parsed.account_id)
      }
    } catch (error) {
      console.error("Error parsing QR data", error);
    }
  }, [data]);

  const saveTransaction = async (transaction) => {
    try {
      console.log("from saveTransaction: ", transaction);
      await addTransaction(transaction);
    } catch (error) {
      console.error("Save Transaction error:", error.response.data);
    }
  };

  const addPoints = async (transaction) => {
    try {
      await addAPPoints(transaction);
    } catch (error) {
      console.error("Add AP points error:", error.response.data);
    }
  };

  const openModal = (e) => {
    setSelectedVoucher(e)
    setModalVisible(true);
    return e
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeConfirmationModal = () => {
    setConfirmVoucherModalVisible(false);
  };

  const handleConfirmPayment = async () => {
    const selectedCardData = cards[selectedCard];

    if (account.wallet.wallet_id === parsedData.wallet_id) {
      Alert.alert("Payment error", "Sender and recipient cannot be the same");
      return navigation.navigate("AccountHome", { account });
    }

    const transaction = {
      vendor: parsedData.account_id,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      amount: parsedData.amount * discount,
      card_id: selectedCardData.card_id,
      sender: account.wallet.wallet_id,
      recipient: parsedData.wallet_id,
      description: parsedData.description,
      items: parsedData.items,
      transaction_ref: parsedData.transaction_reference,
    };

    try {
      if (!(await checkTransaction(transaction.transaction_ref))) {
        await saveTransaction(transaction);
      } else {
        Alert.alert("Payment error", "QR code already used");
        return navigation.navigate("AccountHome", { account });
      }
    } catch (error) {
      console.error("Save Transaction error:", error.response.data);
      navigation.navigate("AccountHome", { account });
      return;
    }

    if (parsedData.description === "POS" && parsedData.items.length > 0) {
      try {
        await addPoints(transaction);
      } catch (error) {
        console.error("Add AP points error:", error.response.data);
      }
    }

    Vibration.vibrate(500);

    if (userVouchers.length != 0) {
      deleteVoucher()
    }
    
    navigation.navigate("PaymentComplete", {
      parsedData,
      selectedCardData,
      date: transaction.date,
      time: transaction.time,
      amount: transaction.amount
    });
  };

  const handleVouchers = async (account_id) => {
    if (account.account_type === "user") {
      try {
        console.log(typeof(account_id.toString()))
        console.log(typeof(account.account_id))
        const response = await getVouchersForUserAndMerchant(account_id.toString(), account.account_id.toString());
        console.log(response);
        setUserVouchers(response)
      } catch (error) {
        console.error("Get Vouchers belonging to User for a Merchant error:", error);
      }
    }
   
  }

  const deleteVoucher = async () => {
    try {
      const response = await deleteVoucherForUser(selectedVoucher.voucher_id, account.account_id);
      console.log(response);
      
    } catch (error) {
      console.error("Delete Voucher error:", error);
    }
  }
  const useVoucher = async () => {
    setDiscount(selectedVoucher.discount / 100.0)
    setVoucherScreen(false)
    closeConfirmationModal()
    setTransactionConfirmed(true)
  }

  const confirmVoucher = async () => {
    setModalVisible(false)
    setConfirmVoucherModalVisible(true)
  }
  const renderVoucherItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <VoucherCard itemDetails={item} openModal={openModal}></VoucherCard>
    </View>
  )

  const handleNoVoucherUse = async () => {
    setVoucherScreen(false)
    setConfirmVoucherModalVisible(false)
    setTransactionConfirmed(true)
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.qrData}>
          {isValidQR ? (
            <>
              <View>
                <Icon name="money-bill-transfer" size={150} color="lightgray" />
              </View>
              <Text style={styles.merchant}>{parsedData.merchant}</Text>
              <Text style={styles.amount}>${parsedData.amount}</Text>
              <Text style={styles.description}>{parsedData.description}</Text>
              <Text style={styles.date}>
                Date: {new Date().toLocaleDateString()}
              </Text>
              <Text style={styles.time}>
                Time: {new Date().toLocaleTimeString()}
              </Text>

              <View style={styles.buttonContainer}>
                <Button
                  style={styles.proceedButton}
                  textColor="black"
                  mode="contained"
                  onPress={() => {
                    if (userVouchers.length === 0 ) {
                      setTransactionConfirmed(true);
                      setIsValidQR(false);
                    } else {
                      setVoucherScreen(true)
                      setIsValidQR(false);
                    }
                    // setTransactionConfirmed(true);
                    // setIsValidQR(false);
                   
                  }}
                >
                  Proceed to payment
                </Button>
                <Button
                  style={styles.cancelButton}
                  textColor="white"
                  mode="outlined"
                  onPress={() =>
                    navigation.navigate("AccountHome", { account })
                  }
                >
                  Cancel
                </Button>
              </View>
            </>
          ) : (
            !transactionConfirmed && !voucherScreen && (
              <View style={styles.subheaderContainer}>
                <Text style={styles.headerText}> QR Code invalid!</Text>
                <Text style={styles.subheaderText}>Scanned data: </Text>
                <Text style={styles.subheaderText}>{data}</Text>
              </View>
            )
          )}

            {voucherScreen && (
              
              
              <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
              <Text style={styles.headerText}> Select Voucher to Use</Text>
                  <ScrollView horizontal>
                      <FlatList
                        data={userVouchers}
                        renderItem={renderVoucherItem}
                        numColumns={3}
                        contentContainerStyle={styles.flatListContainer}
                        
                      />
                  </ScrollView>

                  <Button
                  style={styles.cancelButton}
                  textColor="white"
                  mode="outlined"
                  onPress={handleNoVoucherUse}
                >
                  I don't want to use a Voucher
                </Button>
              </ScrollView>
             
            )}

            <Modal visible={modalVisible}  transparent={true}>
                  <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.titleText}>{selectedVoucher.merchant_name} Discount Voucher</Text>
                        
                        <Text style={styles.subheading}>Amount: {selectedVoucher.discount}%</Text>
                        <Text style={styles.subheading}>Description: {selectedVoucher.description}</Text>
                        
                        <TouchableWithoutFeedback onPress={confirmVoucher}>
                          <Text style={styles.getVoucher}>Use Voucher</Text>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
            </Modal>

            <Modal visible={confirmVoucherModalVisible}  transparent={true}>
                  <TouchableWithoutFeedback onPress={closeConfirmationModal}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.titleText}> Voucher Confirmation</Text>
                        
                        <Text style={styles.subheading}>Are you sure you want to use this Voucher</Text>
                        <Text style={styles.subheading}>Your new total will be {parsedData.amount * discount}</Text>
                        <Text style={styles.subheading}>Once this voucher is used it cannot be used again</Text>
                  
                        
                        <TouchableWithoutFeedback onPress={useVoucher}>
                          <Text style={styles.getVoucher}>Use Voucher</Text>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
            </Modal>


          {transactionConfirmed && (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
              <Text style={styles.headerText}>Payment Options</Text>
              {cards.length > 0 ? (
                <FlatList
                  data={cards}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={
                        index === selectedCard
                          ? styles.selectedCard
                          : styles.card
                      }
                      onPress={() => setSelectedCard(index)}
                    >
                      <View style={styles.cardInfo}>
                        <SmallDebitCard card={item} />
                        {index === selectedCard && (
                          <Icon name="check" size={20} color="white" />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                scrollEnabled={false}
                />
              ) : (
                <Text style={styles.subheaderText}>No cards available</Text>
              )}

              {selectedCard !== -1 && (
                <View style={styles.buttonContainer}>
                  <Button
                    style={styles.proceedButton}
                    textColor="black"
                    mode="contained"
                    onPress={() => handleConfirmPayment()}
                  >
                    Confirm payment
                  </Button>

                  <Button
                    style={styles.cancelButton}
                    textColor="white"
                    mode="outlined"
                    onPress={() =>
                      navigation.navigate("AccountHome", { account })
                    }
                  >
                    Cancel
                  </Button>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  amount: {
    color: "#ffffff",
    fontSize: 20 * scale,
    fontWeight: "bold",
    marginBottom: 15 * scale,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 20 * scale,
    marginBottom: 20 * scale,
    width: "80%",
  },
  cancelButton: {
    borderColor: "#ffffff",
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  getVoucher: {
    marginTop: 20
    
  },
  itemContainer: {
  
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  card: {
    borderColor: "white",
    borderRadius: 10,
    borderStyle: "dotted",
    borderWidth: 2,
    margin: 3,
    padding: 5,
  },
  cardInfo: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  cardsContainer: {
    marginLeft: 10,
    marginTop: 20,
    width: "100%",
  },
  container: {
    width: "90%",
  },
  date: {
    color: "#ffffff",
    fontSize: 12 * scale,
    marginBottom: 5 * scale,
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
  voucherContainer: {
    flex: 1,
    
    padding: 20, // Adjust padding as needed
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
  
  time: {
    color: "#ffffff",
    fontSize: 12 * scale,
    marginBottom: 5 * scale,
  },
  description: {
    color: "#ffffff",
    fontSize: 24,
    marginBottom: 10 * scale,
  },
  headerText: {
    alignContent: "center",
    color: "#ffffff",
    fontSize: 30 * scale,
    fontWeight: "bold",
    marginBottom: 20 * scale,
    textAlign: "center",
  },
  merchant: {
    color: "#ffffff",
    fontSize: 30 * scale,
    fontWeight: "bold",
    marginBottom: 10 * scale,
  },
  proceedButton: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  qrData: {
    alignItems: "center",
  },
  screenContainer: {
    alignItems: "center",
    backgroundColor: "#0f003f",
    flex: 1,
    justifyContent: "center",
  },
  selectedCard: {
    borderColor: "green",
    borderRadius: 10,
    borderStyle: "dotted",
    borderWidth: 2,
    margin: 3,
    padding: 5,
  },
  subheaderContainer: {
    margin: 30,
  },
  subheaderText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
});
