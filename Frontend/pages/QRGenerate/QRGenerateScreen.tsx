import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';


const QRGenerateScreen = () => {
    const [transactionData, setTransactionData] = useState(null);
  
    useEffect(() => {
      const ws = new WebSocket('ws://192.168.1.110:8000/ws/client');
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setTransactionData(data);
      };
  
      return () => {
        ws.close();
      };
    }, []);
  
    return (
      <View>
        <Text>QR Code Test</Text>
        {transactionData && (
          <View>
            <Text>Merchant ID: {transactionData.merchant_id}</Text>
            <Text>Transaction ID: {transactionData.transaction_id}</Text>
            <Text>Items:</Text>
            {transactionData.items.map((item, index) => (
              <Text key={index}>
                - {item.name} (Price: {item.price})
              </Text>
            ))}
            <Text>Total Amount: {transactionData.total_amount}</Text>
          </View>
        )}
      </View>
    );
  };
  
  export default QRGenerateScreen;