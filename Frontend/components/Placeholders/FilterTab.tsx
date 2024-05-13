import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function FilterTab({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <Text style={styles.tabText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#1f007f',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default FilterTab;
