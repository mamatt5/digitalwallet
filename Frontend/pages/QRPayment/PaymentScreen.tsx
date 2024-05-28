import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Vibration,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { getWalletCards, addTransaction } from '../../api/api';
import SmallDebitCard from '../../components/SmallDebitCard';

const { width, height } = Dimensions.get('window');
const scale = width / 320;

function PaymentScreen({ route, navigation }) {
  const { data, account } = route.params;
  const [cards, setCards] = useState([]);
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);
  const [isValidQR, setIsValidQR] = useState(false);
  const [parsedData, setParsedData] = useState('');
  const [selectedCard, setSelectedCard] = useState(-1);

  const fetchCards = async () => {
    try {
      const response = await getWalletCards(account.wallet.wallet_id);
      console.log(response);
      setCards(response);
    } catch (error) {
      console.error('Get Cards error:', error);
    }
  };

  useEffect(() => {
    fetchCards();
    console.log(cards);
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
      }
    } catch (error) {
      console.error('Error parsing QR data', error);
    }
  }, [data]);

  const saveTransaction = async (transaction) => {
    try {
      console.log("from saveTransaction: " , transaction)
      await addTransaction(transaction);
    } catch (error) {
      console.error('Save Transaction error:', error.response.data);
    }
  };

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
      description: parsedData.description,
      items: parsedData.items,
    };

    console.log("Payment screen:" + transaction);

    await saveTransaction(transaction);
    Vibration.vibrate(500);
    navigation.navigate("PaymentComplete", {
      parsedData,
      selectedCardData,
      date: transaction.date,
      time: transaction.time,
    });
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
                  color="lightgray"
                />
              </View>
              <Text style={styles.merchant}>{parsedData.merchant}</Text>
              <Text style={styles.amount}>
                $
                {parsedData.amount}
              </Text>
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
                  onPress={() => navigation.navigate('AccountHome', { account })}
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
            <View style={styles.container}>
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
                />
              ) : (
                <Text style={styles.subheaderText}>
                  No cards available
                </Text>
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
                      onPress={() => navigation.navigate('AccountHome', { account })}
                    >
                      Cancel
                    </Button>
                  </View>
                )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  amount: {
    color: '#ffffff',
    fontSize: 20 * scale,
    fontWeight: 'bold',
    marginBottom: 15 * scale,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 40 * scale,
    width: '80%',
  },
  cancelButton: {
    borderColor: '#ffffff',
  },
  card: {
    borderColor: 'white',
    borderRadius: 10,
    borderStyle: 'dotted',
    borderWidth: 2,
    margin: 3,
    padding: 5,
  },
  cardInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  cardsContainer: {
    marginLeft: 10,
    marginTop: 20,
    width: '100%',
  },
  container: {
    justifyContent: 'center',
    width: '90%',
  },
  date: {
    color: '#ffffff',
    fontSize: 12 * scale,
    marginBottom: 5 * scale,
  },
  time: {
    color: '#ffffff',
    fontSize: 12 * scale,
    marginBottom: 5 * scale,
  },
  description: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 10 * scale,
  },
  headerText: {
    alignContent: 'center',
    color: '#ffffff',
    fontSize: 30 * scale,
    fontWeight: 'bold',
    marginBottom: 20 * scale,
    textAlign: 'center',
  },
  merchant: {
    color: '#ffffff',
    fontSize: 30 * scale,
    fontWeight: 'bold',
    marginBottom: 10 * scale,
  },
  proceedButton: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  qrData: {
    alignItems: 'center',
  },
  screenContainer: {
    alignItems: 'center',
    backgroundColor: '#0f003f',
    flex: 1,
    justifyContent: 'center',
  },
  selectedCard: {
    borderColor: 'green',
    borderRadius: 10,
    borderStyle: 'dotted',
    borderWidth: 2,
    margin: 3,
    padding: 5,

  },
  subheaderContainer: {
    margin: 30,
  },
  subheaderText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
