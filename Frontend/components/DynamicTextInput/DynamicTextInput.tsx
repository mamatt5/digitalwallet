import React from "react";
import { TextInput, StyleSheet } from "react-native";

type PlaceholderProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error: boolean;
};


const styles = StyleSheet.create({
    'text-box-container': {
        display: "flex", 
        backgroundColor: "#696087",
        color: "#ffffff",
        width: 250, 
        height: 45, 
        borderRadius: 15, 
        margin: 10, 
        paddingLeft: 10, 
        
    },

    'text-box-container-error': {
      display: "flex", 
      backgroundColor: "#696087",
      width: 250, 
      height: 45, 
      borderRadius: 15, 
      margin: 10, 
      paddingLeft: 10, 
      color: 'rgba(255, 255, 255, 0.8)', // Text color with opacity
      borderColor: "red", // Border color
      borderWidth: 1, // Border width
    }
  });

const DynamicTextInput = (props: PlaceholderProps) => { 
  const containerStyle = props.error ? styles["text-box-container-error"] : styles["text-box-container"];
  return (
    <TextInput
      style={containerStyle}
      placeholderTextColor="#ffffff"
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export default DynamicTextInput;