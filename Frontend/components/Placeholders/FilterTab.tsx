import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterTab = ({ label, onPress }) => (
  <TouchableOpacity style={styles.tab} onPress={onPress}>
    <Text style={styles.tabText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1f007f',
    borderRadius: 20
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16
  }
});

export default FilterTab;
