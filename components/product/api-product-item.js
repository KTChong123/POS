import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ApiProductItem = ({ id, name, description, price }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ApiProduct", {
          productId: id,
          name,
          description,
          price,
        })
      }
    >
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    borderRadius: 10,
    marginVertical: 5,
    padding: 30,
  },
});
export default ApiProductItem;
