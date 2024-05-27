import React, { useState }  from 'react';
import {View, StyleSheet, Text, Pressable, Touchable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  profileButtonContainer: {
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
