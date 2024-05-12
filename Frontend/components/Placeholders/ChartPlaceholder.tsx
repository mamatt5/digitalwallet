import { View, Text, StyleSheet } from 'react-native';

const ChartPlaceholder = ({ children }) => (
  <View style={styles.chartPlaceholder}>
    <Text style={styles.placeholderText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20
  },
  placeholderText: {
    color: '#ffffff',
    fontSize: 16
  }
});

export default ChartPlaceholder;