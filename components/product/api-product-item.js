import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ApiProductItem = ({ id, name, description, price }) => {
  const navigation = useNavigation();

  let createOrder = (complete, customer, product) => {
    fetch("https://web-production-820e.up.railway.app/api/create-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complete: complete,
        customer: customer,
        product: product,
      }),
    })
      .then((res) => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  let createOrderItem = (quantity, product, order) => {
    fetch("https://web-production-820e.up.railway.app/api/create-order-item/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        product: product,
        order: order,
      }),
    })
      .then((res) => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

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
      <Text>RM {price}</Text>
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
