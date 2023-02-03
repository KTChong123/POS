import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import ApiProductList from "../components/product/api-product-list";

const ApiFetchScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>This is the API fetch screen</Text>
      <ApiProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default ApiFetchScreen;
