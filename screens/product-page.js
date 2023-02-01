import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

const ProductPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { productId, title, description } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "new title",
      headerLeft: () => (
        <HeaderBackButton
          tintColor="white"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

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
