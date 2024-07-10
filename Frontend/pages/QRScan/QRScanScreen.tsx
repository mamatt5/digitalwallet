import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');
const scale = width / 320;

function QRScanScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const { account } = route.params;

  const handleBarcodeScanned = ({ data }) => {
    navigation.navigate("QRPayment", { data, account });
  };


  if (!permission) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <View style={styles.buttonContainer}>
          <Button title="Allow Camera" onPress={requestPermission} />
        </View>
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
        </View>
      )}
    </SafeAreaView>
  );
}

export default QRScanScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    width: "50%",
    marginTop: 70
  },
  camera: {
    height: 250 * scale,
    width: 250 * scale,
  },
  cameraContainer: {
    borderColor: "#00a28e",
    borderWidth: 10,
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    margin: 30,
    alignContent: "center",
    textAlign: "center",
  },
  qrText: {
    color: "#ffffff",
    fontSize: 20,
    margin: 30,
  },
  screenContainer: {
    backgroundColor: "#0f003f",
    height: 2000,
  },
});
