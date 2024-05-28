import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Tab from './Tab';

const { width, height } = Dimensions.get('window');
const scale = width / 320;

function CardTabs({ activeTabIndex, setActiveTabIndex }) {
  return (
    <View style={styles.tabContainer}>
      <Tab
        label="Bank Cards"
        isActive={activeTabIndex === 0}
        onPress={() => setActiveTabIndex(0)}
      />
      <Tab
        label="Loyalty Cards"
        isActive={activeTabIndex === 1}
        onPress={() => setActiveTabIndex(1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10 * scale,
  },
});

export default CardTabs;
