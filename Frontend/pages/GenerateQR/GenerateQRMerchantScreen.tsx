import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { connectToWebSocket } from '../../api/api';

function QRGenerateScreenMerchant() {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const ws = connectToWebSocket(
      '/ws/clients/happy',
      (data) => {
        setTransactionData(data);
      },
    );

    return ws;
  }, []);

  const qrData = transactionData
    ? JSON.stringify(transactionData)
    : '';

  return (
    <View style={{ padding: 16, backgroundColor: '#f0f0f0', flex: 1 }}>
      <Text style={{
        fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16,
      }}
      >
        QR Code Test
      </Text>
      {transactionData ? (
        <View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18 }}>
              Merchant ID:
              {transactionData.merchant_id}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Transaction ID:
              {transactionData.transaction_id}
            </Text>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Items:</Text>
          <FlatList
            data={transactionData.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={{ fontSize: 16, marginVertical: 4 }}>
                {item.name}
                {' '}
                x
                {item.quantity}
                {' '}
                | $
                {item.price}
              </Text>
            )}
          />
          <Text style={{ fontSize: 18 }}>
            Total Amount: $
            {transactionData.total_amount.toFixed(2)}
          </Text>
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <QRCode value={qrData} size={200} />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

export default QRGenerateScreenMerchant;
