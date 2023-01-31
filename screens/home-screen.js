import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import ProductList from "../components/product/product-list";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>This is the home screen</Text>
      <ProductList />
      <Button
        title="move to product"
        onPress={() => navigation.navigate("Product")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default HomeScreen;
