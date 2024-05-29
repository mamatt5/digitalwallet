import React from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const scale = width / 320;

function Tab({ isActive, onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tab} activeOpacity={0.8}>
      <LinearGradient
        colors={isActive ? ['#ccfed8', '#bbe8d2', '#b0dad9', '#a6cee0', '#9ac0e8', '#94b9ff', '#768ed2'] : ['#FFFFFF', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
  innerContainer: {
    backgroundColor: '#0f003f',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    margin: 2,
  },
  linearGradient: {
    borderRadius: 20,
    height: 40,
    width: 120 * scale,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Tab;
