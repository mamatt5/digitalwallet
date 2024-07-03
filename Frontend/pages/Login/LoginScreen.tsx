import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput";
import { loginUser } from "../../api/api";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Genericlogo from "../../assets/Genericlogo.png";
import APPlogo from "../../assets/APPlogo.png";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAccountFromEmail } from "../../api/api";
import { authenticateAccount } from "../../api/api";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showFullPass, setShowFullPass] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Clear the text input value when the screen comes into focus
      setEmail("");
      setPassword("");
    });
    return unsubscribe;
  }, [navigation]);

  const handleEmailChange = (event) => {
    setEmail(event);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event);
    setPasswordError(false);
  };

  const handleLogin = async () => {
    const newEmailError =
      email === "" ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const newPasswordError =
      password === "" || !/(?=.*[0-9])(?=.*[A-Z]).+/.test(password);

    if (newEmailError || newPasswordError) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

  

    let response = false
    try {
      response = await authenticateAccount(password, email.toLocaleLowerCase())
      // console.log("authenticate")
      // console.log(response)
    } catch (error) {
      console.error("Checking Pass Error")
    }

    if (response) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    try {
      const response = await loginUser(email.toLocaleLowerCase(), password);
      const { account } = response;

      if (account) {
        navigation.navigate("Main", { account });
      } else {
        console.error("Account object is missing in response");
      }
    } catch (error) {
      setEmailError(true);
      setPasswordError(true);
      console.error("Login error:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0f003f", height: 2000 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={120}
      >
        <ScrollView>
          <Image source={APPlogo} style={styles.APPlogo} />
          <View style={styles.centerView}>
            <Text style={{ color: "#ffffff", fontSize: 30, margin: 30 }}>
              {"Log in"}
            </Text>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="EMAIL"
                  onChangeText={(e) => handleEmailChange(e)}
                  value={email}
                  error={emailError}
                  keyboardType="email-address"
                />
              </View>
              {emailError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() =>
                    Alert.alert("Invalid Email", "Please enter a valid email")
                  }
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}
            </View>

            <View style={styles.container}>
              <View>
                <DynamicTextInput
                  placeholder="PASSWORD"
                  onChangeText={handlePasswordChange}
                  value={password}
                  error={passwordError}
                  secureTextEntry={!showFullPass}
                />
              </View>

              <Ionicons
                name={showFullPass ? "eye" : "eye-off"}
                size={25}
                color="#fff"
                onPress={() => setShowFullPass(!showFullPass)}
                style={styles.eyeButton}
              />

              {passwordError && (
                <MaterialIcons
                  name="error-outline"
                  onPress={() =>
                    Alert.alert(
                      "Invalid password",
                      "Please enter a valid password"
                    )
                  }
                  color="red"
                  style={styles.errorIcon}
                  size={25}
                />
              )}
            </View>

            <Button
              buttonColor="#ffffff"
              textColor="#000000"
              onPress={handleLogin}
              style={styles.buttonContainer}
            >
              <Text>Log In</Text>
            </Button>

            <Text
              onPress={() => navigation.navigate("ForgotPassword")}
              style={styles.linkText}
            >
              Forgot Password
            </Text>
            <Text
              onPress={() => navigation.navigate("RegisterOption")}
              style={styles.linkText}
            >
              Sign Up
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");
const scale = width / 320;

const styles = StyleSheet.create({
  APPlogo: {
    width: 200 * scale,
    height: 200 * scale,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  centerView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#ffffff",
    fontSize: 40 * scale,
    margin: 30,
  },
  buttonContainer: {
    width: 200,
    marginTop: 10,
  },

  linkText: {
    color: "#ffffff",
    marginTop: 20,
  },
  errorIcon: {
    position: "absolute",
    right: -20,
  },
  eyeButton: {
    position: "absolute",
    right: 25,
    opacity: 0.6,
  },
});

export default LoginScreen;
