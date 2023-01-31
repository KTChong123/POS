import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

const ProductPage = () => {
  const route = useRoute();

  const { productId, title, description } = route.params;

  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: 20 }}>This is the product page {productId}</Text>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text style={{ fontSize: 20 }}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default ProductPage;
