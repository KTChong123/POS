import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

const ApiProductPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { productId, name, description, price } = route.params;

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
      <Text style={{ fontSize: 20 }}>{name}</Text>
      <Text style={{ fontSize: 20 }}>{description}</Text>
      <Text style={{ fontSize: 20 }}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default ApiProductPage;
