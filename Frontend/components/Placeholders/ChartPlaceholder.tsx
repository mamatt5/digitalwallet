import { View, Text, StyleSheet } from 'react-native';

function ChartPlaceholder({ children }) {
  return (
    <View style={styles.chartPlaceholder}>
      <Text style={styles.placeholderText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chartPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ChartPlaceholder;
