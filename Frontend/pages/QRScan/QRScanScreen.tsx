import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import {
  Button, SafeAreaView, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    overflow: 'hidden',
    borderColor: '#00a28e',
    borderWidth: 10,
  },
  camera: {
    height: 200,
    width: 200,
  },
});

function QRScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    setText(`Scanned QR Code Details:\n\nType: ${type}\n\nData: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Allow Camera"
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#0f003f', height: 2000 }}>
      <View style={styles.container}>

        <Text style={{ color: '#ffffff', fontSize: 20, margin: 30 }}>Please scan QR code</Text>
        <View style={styles.cameraContainer}>
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
          />
        </View>
        {scanned && (
        <View>
          <Text style={{ color: '#ffffff', fontSize: 20, margin: 30 }}>{text}</Text>
          <View style={{ width: '50%', alignSelf: 'center' }}>
            <Button
              title="Tap to Scan Again"
              onPress={() => setScanned(false)}
            />
          </View>
        </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default QRScanScreen;
