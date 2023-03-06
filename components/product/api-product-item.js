import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet, View, Button } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

const ApiProductItem = ({ table, category, id, name, description, price }) => {
  const navigation = useNavigation();

  const db = SQLite.openDatabase("test10.db");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const [currentOrder, setCurrentOrder] = useState(undefined);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    refreshOrder();
  }, [reload]);

  const refreshOrder = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM orders",
        null,
        (txObj, resultSet) => {
          setOrders(resultSet.rows._array);
          console.log(resultSet.rows._array);
          setIsLoading(false);
        },
        (txObj, error) => console.log(error)
      );
    });
    setReload(false);
  };

  const addAppOrder = () => {
    console.log("ADD button clicked");
    refreshOrder();
    let quantity = quantity;
    let orderItem = [];
    orderItem = orders.filter((data) => data.name == name);
    const filteredArray = orders.filter((item) => item.quantity > 0);
    console.log(orders);
    console.log("orderItem: " + orderItem);
    console.log(orderItem.quantity);
    console.log("filteredArray: " + filteredArray);
    console.log("product: " + name);
    console.log(orders.filter((data) => data.name == name));
    if (orders == []) {
      quantity = 0;
    } else {
      quantity = 1;
      console.log(id);
    }
    quantity = quantity + 1;
    console.log(id + quantity);
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO orders (name, table_number, price, quantity) VALUES (?,?,?,?)",
        [name, table, price, quantity],
        (txObj, resultSet) => {
          let existingOrders = [...orders];
          existingOrders.push({
            id: resultSet.insertId,
            name: currentOrder,
            table_number: table,
          });
          setOrders(existingOrders);
        },
        (txObj, error) => console.log(error)
      );
    });
    setReload(true);
    global.reloadCart = true;
  };

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
    <TouchableOpacity style={styles.card} onPress={addAppOrder}>
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
