import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from '@react-navigation/native';

const QRScanScreen = () => {
    const isFocused = useIsFocused();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not yet scanned");
    
    const handleBarcodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(`Scanned QR Code Details:\n\nType: ${type}\n\nData: ${data}`);
    };

    useEffect(() => {
        if (!isFocused) {
            setScanned(false);
            setText("Not yet scanned");
        }
    }, [isFocused]);

    if (!permission) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button
                    title={"Allow Camera"}
                    onPress={requestPermission}
                />
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.screenContiner}>
            {isFocused && (
                <View style={styles.container}>
                    
                <Text style={styles.headerText}>Please scan QR code</Text>
                    <View style={styles.cameraContainer}>
                        <CameraView
                            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                            style={styles.camera}
                        />
                    </View>
                    {scanned && (
                        <View>
                        <Text style={styles.qrText}>{text}</Text>
                        <View style={styles.buttonContainer}>
                            <Button
                            title={"Tap to Scan Again"}
                            onPress={() => setScanned(false)}
                            />
                        </View>
                        </View>
                    )}
                </View>
                )}
        </SafeAreaView>
    );
    };

export default QRScanScreen;

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
  screenContiner: {
    backgroundColor: '#0f003f',
    height: 2000
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    margin: 30
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
  },
  qrText: {
    color: '#ffffff',
    fontSize: 20,
    margin: 30
  }
});
