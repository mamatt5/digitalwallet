import React, { useState } from 'react'
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native'

const AddCardScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')


  const scanCard = () => {
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', flex: 1 }}>
      <View style={{alignSelf: 'center'}}>
        <Text style={{ color: '#ffffff', fontSize: 40, margin: 30 }}>
          {'Enter card details'} </Text>
        
        <View>
          <View style={{ margin: 20, width: 200 }}>
            <Text style={{ color: '#ffffff', fontSize: 20, margin: 10 }}>Card number:</Text>
            <TextInput style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 5 }} 
              onChangeText={setCardNumber} 
              value={cardNumber} 
              maxLength={16}
              keyboardType='numeric'/>


            <Text style={{ color: '#ffffff', fontSize: 20, margin: 10 }}>Expiry date:</Text>
            <TextInput style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 5 }} 
              onChangeText={setExpiryDate} 
              value={expiryDate} />
            
            <View  style={{marginTop: 20}}>
                <Button title={"Add card"} onPress={() => navigation.navigate('Cards')}></Button>
            </View>
            
            <View  style={{marginTop: 20}}>
                <Button title={"Scan card"} onPress={scanCard}></Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddCardScreen