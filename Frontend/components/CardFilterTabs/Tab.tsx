import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function Tab({ isActive, onPress, label }) {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive ? styles.activeTab : styles.inactiveTab]}
      onPress={onPress}
    >
      <Text style={styles.tabText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: '#0f003f',
    borderColor: 'cyan',
    borderWidth: 2,
  },
  inactiveTab: {
    backgroundColor: '#0f003f',
    borderColor: '#F0F0F0',
    borderWidth: 2,
  },
  tab: {
    alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
    color: '#F0F0F0',
    fontSize: 16,
  },
});

export default Tab;
