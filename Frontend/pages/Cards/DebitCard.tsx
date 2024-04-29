import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const DebitCard = ({ number, expiry }) => {
    const [showFullNumber, setShowFullNumber] = useState(false);

    const displayNumber = showFullNumber ? number : '**** **** **** ' + number.slice(-4);

    return (
      <View style={{ 
        backgroundColor: '#fff', 
        padding: 20, 
        margin: 10, 
        borderRadius: 10, 
        width: 300,
        height: 200, 
        alignSelf: 'center', 
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>{displayNumber}</Text>
            <Text>Expiry: {expiry}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowFullNumber(!showFullNumber)}>
            <Icon name={showFullNumber ? "eye-slash" : "eye"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

export default DebitCard