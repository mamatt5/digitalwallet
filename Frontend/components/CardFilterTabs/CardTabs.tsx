import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tab from './Tab';

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
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

export default CardTabs;
