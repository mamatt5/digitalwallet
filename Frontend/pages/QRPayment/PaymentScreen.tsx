import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome6";
import { getWalletCards, addTransaction } from "../../api/api";
import SmallDebitCard from "../../components/SmallDebitCard";

const PaymentScreen = ({ route, navigation }) => {
  const { data, account } = route.params;
  const [cards, setCards] = useState([]);
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);
  const [isValidQR, setIsValidQR] = useState(false);
  const [parsedData, setParsedData] = useState("");
  const [selectedCard, setSelectedCard] = useState(-1);

  const fetchCards = async () => {
    try {
      const response = await getWalletCards(account.wallet.wallet_id);
      setCards(response);
    } catch (error) {
      console.error("Get Cards error:", error);
    }
  };

  useEffect(() => {
    fetchCards();
    console.log(cards);
  }, []);

  useEffect(() => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.merchant && parsed.amount && parsed.wallet_id && parsed.account_id) {
        setIsValidQR(true);
        setParsedData(parsed);
      }
    } catch (error) {
      console.error("Error parsing QR data", error);
    }
  }, [data]);

  const saveTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);
    } catch (error) {
      console.error("Save Transaction error:", error.response.data);
    }
  }

  const handleConfirmPayment = async () => {
    const selectedCardData = cards[selectedCard];
    const transaction = {
      vendor: parsedData.account_id,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      amount: parsedData.amount,
      card_id: selectedCardData.card_id,
      sender: account.wallet.wallet_id,
      recipient: parsedData.wallet_id,
      description: parsedData.description, };

      console.log(transaction)

    await saveTransaction(transaction);
    navigation.navigate("PaymentComplete", { parsedData, selectedCardData, date: transaction.date, time: transaction.time });
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.qrData}>
          {isValidQR ? (
            <>
              <View>
                <Icon
                  name="money-bill-transfer"
                  size={150}
                  color={"lightgray"}
                />
              </View>
              <Text style={styles.merchant}>{parsedData.merchant}</Text>
              <Text style={styles.amount}>${parsedData.amount}</Text>
              <Text style={styles.description}>{parsedData.description}</Text>
              <Text style={styles.date}>Date: {new Date().toLocaleDateString()}</Text>
              <Text style={styles.time}>Time: {new Date().toLocaleTimeString()}</Text>

              <View style={styles.buttonContainer}>
                <Button
                  style={styles.proceedButton}
                  textColor="black"
                  mode="contained"
                  onPress={() => {
                    setTransactionConfirmed(true);
                    setIsValidQR(false);
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
            !transactionConfirmed && (
              <View style={styles.subheaderContainer}>
                <Text style={styles.headerText}> QR Code invalid!</Text>
                <Text style={styles.subheaderText}>Scanned data: </Text>
                <Text style={styles.subheaderText}>{data}</Text>
              </View>
            )
          )}

          {transactionConfirmed && (
            <>
              <View style={styles.container}>
                <View>
                  <Text style={styles.headerText}>Payment</Text>
                </View>

                <View style={styles.subheaderContainer}>
                  <Text style={styles.subheaderText}>Payment options:</Text>
                  <View style={styles.cardsContainer}>
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
                      />
                    ) : (
                      <Text style={styles.subheaderText}>
                        No cards available
                      </Text>
                    )}
                  </View>
                </View>
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
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
  container: {
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  qrData: {
    marginTop: 20,
    alignItems: "center",
  },
  merchant: {
    color: "#ffffff",
    fontSize: 50,
    marginBottom: 30,
    fontWeight: "bold",
  },
  amount: {
    color: "#ffffff",
    fontSize: 40,
    marginBottom: 25,
    fontWeight: "bold",
  },
  description: {
    color: "#ffffff",
    fontSize: 24,
    marginBottom: 10,
  },
  date: {
    color: "#ffffff",
    fontSize: 18,
  },
  time: {
    color: "#ffffff",
    fontSize: 18,
  },
  //   headerText: {
  //     color: "#ffffff",
  //     fontSize: 24,
  //     margin: 30,
  //     alignContent: "center",
  //     textAlign: "center",
  //   },
  buttonContainer: {
    marginTop: 50,
    alignSelf: "center",
    width: "50%",
  },
  proceedButton: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  cancelButton: {
    borderColor: "#ffffff",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 50,
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
  },
  subheaderText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  subheaderContainer: {
    margin: 30,
  },
  cardsContainer: {
    marginTop: 20,
    width: "100%",
    marginLeft: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    margin: 3,
    borderStyle: "dotted",
    padding: 5,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    margin: 3,
    padding: 5,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
