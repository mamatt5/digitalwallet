import React, { useState }  from 'react';
import {View, StyleSheet, Text, Pressable, Touchable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  profileButtonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 1,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 30,
  }
});

function ProfileButton() {

  return (
      <Icon
        name="user"
        size={35}
        color="#ffffff"
      />
  );
}

export default ProfileButton;
