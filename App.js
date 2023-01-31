import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  View,
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./navigation/stack";

export default function App() {
  console.log("App executed");
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
