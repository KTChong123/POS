import { useNavigation } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

var tableloop = [];

for (let i = 1; i <= 30; i++) {
  tableloop.push(
    <View key={i}>
      <View
        style={{
          width: 100,
          height: 100,
          padding: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#e6e6fa",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <Text>Table</Text>
          <Text>{i}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const TableSelectScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>This is table select screen</Text>
      <ScrollView>
        <View style={styles.container}>{tableloop}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  container: {
    width: "100%",
    height: "85%",
    padding: 0,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default TableSelectScreen;
