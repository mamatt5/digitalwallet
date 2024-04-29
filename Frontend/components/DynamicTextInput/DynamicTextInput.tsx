/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type PlaceholderProps = {
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
};

const styles = StyleSheet.create({
  'text-box-container': {
    display: 'flex',
    backgroundColor: '#696087',
    color: '#ffffff',
    width: 250,
    height: 45,
    borderRadius: 15,
    margin: 10,
    paddingLeft: 10,
  },
});

function DynamicTextInput(props: PlaceholderProps) {
  return (
    <TextInput
      style={styles['text-box-container']}
      placeholderTextColor="#ffffff"
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
}

export default DynamicTextInput;
