import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import ApiProductList from "../components/product/api-product-list";
import ApiProductCategoryList from "../components/product/api-product-category-list";
import CartScreen from "./cart-screen";

const CategoryPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { table } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Category",
      headerLeft: () => (
        <HeaderBackButton
          tintColor="white"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

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

  let updateOrderItem = (id, quantity, product, order) => {
    fetch(
      `https://web-production-820e.up.railway.app/api/update-order-item/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          quantity: quantity,
          product: product,
          order: order,
        }),
      }
    )
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

  let deleteOrderItem = (id) => {
    fetch(
      `https://web-production-820e.up.railway.app/api/delete-order-item/${id}`,
      {
        method: "DELETE",
      }
    )
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
    <View style={styles.screen}>
      <Text style={{ fontSize: 20 }}>This is the category page</Text>
      <CartScreen table={table} />
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 2, fontSize: 20, textAlign: "left" }}>
          Table: {table}
        </Text>
        <Text style={{ flex: 4, fontSize: 20, textAlign: "right" }}>
          Item: 2 Total: RM14.50
        </Text>
      </View>

      <Button
        title="ADD TO CART"
        onPress={() => createOrderItem("1", productId, "102")}
      />
      <Button
        title="UPDATE CART 340"
        onPress={() => updateOrderItem("340", "3", productId, "102")}
      />
      <Button title="DELETE ITEM 341" onPress={() => deleteOrderItem("341")} />
      <ApiProductCategoryList table={table} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default CategoryPage;
