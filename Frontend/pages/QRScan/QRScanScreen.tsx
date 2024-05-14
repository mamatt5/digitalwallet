import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import {
  Button, SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

function QRScanScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  // const [scanned, setScanned] = useState(false);
  // const [text, setText] = useState('Not yet scanned');

  const handleBarcodeScanned = ({ type, data }) => {
    // setScanned(true);
    // setText(`Scanned QR Code Details:\n\nType: ${type}\n\nData: ${data}`);
    navigation.navigate('QRPayment', { type, data });
  };

  // useEffect(() => {
  //   if (!isFocused) {
  //     // setScanned(false);
  //     setText('Not yet scanned');
  //   }
  // }, [isFocused]);

  if (!permission) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Allow Camera"
          onPress={requestPermission}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      {isFocused && (
        <View style={styles.container}>

          <Text style={styles.headerText}>Scan & Pay</Text>
          <View style={styles.cameraContainer}>
            <CameraView
              onBarcodeScanned={handleBarcodeScanned}
              style={styles.camera}
            />
          </View>

          <View>
            <Text style={styles.headerText}>
              Please scan the QR code to proceed with payment
            </Text>
          </View>

          {/* {scanned && (
          <View>
            <Text style={styles.qrText}>{text}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Tap to Scan Again"
                onPress={() => setScanned(false)}
              />
            </View>
          </View>
          )} */}

        </View>
      )}
    </SafeAreaView>
  );
}

export default QRScanScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
  },
  camera: {
    height: 300,
    width: 300,
  },
  cameraContainer: {
    borderColor: '#00a28e',
    borderWidth: 10,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    margin: 30,
    alignContent: 'center',
    textAlign: 'center',
  },
  qrText: {
    color: '#ffffff',
    fontSize: 20,
    margin: 30,
  },
  screenContainer: {
    backgroundColor: '#0f003f',
    height: 2000,
  },
});
