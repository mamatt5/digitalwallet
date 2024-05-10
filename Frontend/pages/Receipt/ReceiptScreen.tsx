import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

export default function ReceiptScreen() {

    const data = [
        { id: 1, vendor: "Vendor Name", date: "16 May 2024", amount: "$1000" },
        { id: 2, vendor: "Vendor Name", date: "16 May 2024", amount: "$1000" },
        { id: 2, vendor: "Vendor Name", date: "16 May 2024", amount: "$1000" },
        { id: 2, vendor: "Vendor Name", date: "16 May 2024", amount: "$1000" },
        { id: 2, vendor: "Vendor Name", date: "16 May 2024", amount: "$1000" },
      ];

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Recent Activity</Text>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.vendor} - {item.date} - {item.amount}</Text>
              </View>
            )}
          />
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f003f',
      padding: 20
    },
    header: {
      fontSize: 24,
      color: '#ffffff',
      marginBottom: 20
    },
    item: {
      backgroundColor: '#1f007f',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    itemText: {
      color: '#ffffff',
      fontSize: 16
    }
  });