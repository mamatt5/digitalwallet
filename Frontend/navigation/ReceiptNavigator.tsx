import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DetailedReceiptsScreen from "../pages/DetailedReceipt/DetailedReceipt";
import ReceiptsScreen from "../pages/Receipts/ReceiptsScreen";

const ReceiptStack = createStackNavigator();

function ReceiptNavigator({ route }) {
  const { account } = route.params;

  return (
    <ReceiptStack.Navigator
      initialRouteName="ReceiptsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0f003f",
        },
        headerTintColor: "#fff",
        headerTitle: " ",
      }}
    >
      <ReceiptStack.Screen
        name="DetailedReceipt"
        initialParams={{ account }}
        component={DetailedReceiptsScreen}
        options={{ headerShown: false }}
      />

      <ReceiptStack.Screen
        name="ReceiptsScreen"
        initialParams={{ account }}
        component={ReceiptsScreen}
        options={{ headerShown: false }}
      />
    </ReceiptStack.Navigator>
  );
}

export default ReceiptNavigator;
