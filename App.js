import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./navigation/stack";
import { MyDrawer } from "./navigation/drawer";

export default function App() {
  console.log("App executed");
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {/* <HomeStack /> */}
        <MyDrawer />
      </NavigationContainer>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
