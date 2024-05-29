/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type PlaceholderProps = {
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  error?: boolean;
  onFocus?: ()=> void
  maxLength?: number
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad' | 'number-pad' | 'ascii-capable' | 'url';
};

const styles = StyleSheet.create({
  'text-box-container': {
    backgroundColor: '#696087',
    borderRadius: 15,
    color: '#ffffff',
    display: 'flex',
    height: 45,
    margin: 10,
    paddingLeft: 10,
    width: 250,

  },

  'text-box-container-error': {
    display: 'flex',
    backgroundColor: '#696087',
    width: 250,
    height: 45,
    borderRadius: 15,
    margin: 10,
    paddingLeft: 10,
    color: 'rgba(255, 255, 255, 0.8)', // Text color with opacity
    borderColor: 'red', // Border color
    borderWidth: 1, // Border width
  },
});

function DynamicTextInput(props: PlaceholderProps) {
  const containerStyle = props.error ? styles['text-box-container-error'] : styles['text-box-container'];
  return (
    <TextInput
      style={containerStyle}
      placeholderTextColor="#ffffff"
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      onFocus={props.onFocus}
      maxLength={props.maxLength ? props.maxLength : 10000}
      keyboardType={props.keyboardType}
    />
  );
}

export default DynamicTextInput;
