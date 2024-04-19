import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const QRScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not yet scanned");
    
    const askForCameraPermission = () => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
        })();
    };
    
    useEffect(() => {
        askForCameraPermission();
    }, []);
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(`QR code with type ${type} and data ${data} has been scanned!`);
    };
    
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text>No access to camera</Text>
            <Button
            title={"Allow Camera"}
            onPress={() => askForCameraPermission()}
            />
        </View>
        );
    }
    
    return (
        <View style={styles.container}>
        <View style={styles.cameraContainer}>
            <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
            />
        </View>
        {scanned && (
            <View>
            <Text>{text}</Text>
            <View style={{ width: "50%", alignSelf: "center" }}>
                <Button
                title={"Tap to Scan Again"}
                onPress={() => setScanned(false)}
                />
            </View>
            </View>
        )}
        </View>
    );
    };

export default QRScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    height: 200,
    width: 200,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  camera: {
    flex: 1,
  },
});
