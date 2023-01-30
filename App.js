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

export default function App() {
  console.log("App executed");

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Hello.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
