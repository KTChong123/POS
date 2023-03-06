import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

const CartScreen = ({ table }) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const db = SQLite.openDatabase("test10.db");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const [currentOrder, setCurrentOrder] = useState(undefined);
  const [reloadCart, setReloadCart] = useState(false);

  if (reloadCart == global.reloadCart) {
  } else {
    setReloadCart(global.reloadCart);
  }

  const refreshOrder = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM orders",
        null,
        (txObj, resultSet) => {
          setOrders(resultSet.rows._array);
          setIsLoading(false);
        },
        (txObj, error) => console.log(error)
      );
    });
    setReloadCart(false);
    global.reloadCart = false;
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, table_number INT, price REAL, quantity INT)"
      );
    });

    refreshOrder();
  }, [time, reloadCart]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading orders...</Text>
      </View>
    );
  }

  const addOrder = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO orders (name) values (?)",
        [currentOrder],
        (txObj, resultSet) => {
          let existingOrders = [...orders];
          existingOrders.push({ id: resultSet.insertId, name: currentOrder });
          setOrders(existingOrders);
          setCurrentOrder(undefined);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const deleteOrder = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM orders WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingOrders = [...orders].filter((name) => name.id !== id);
            setOrders(existingOrders);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateOrder = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE orders SET name = ? WHERE id = ?",
        [currentOrder, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingOrders = [...orders];
            const indexToUpdate = existingOrders.findIndex(
              (name) => name.id === id
            );
            existingOrders[indexToUpdate].name = currentOrder;
            setOrders(existingOrders);
            setCurrentOrder(undefined);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showOrders = () => {
    return orders.map((name, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text>{name.name}</Text>
          <Text>T{name.table_number}</Text>
          <Text>RM{name.price.toFixed(2)}</Text>
          <Text>x {name.quantity}</Text>
          <Button title="Update" onPress={() => updateOrder(name.id)} />
          <Button title="Delete" onPress={() => deleteOrder(name.id)} />
        </View>
      );
    });
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 2, fontSize: 20, textAlign: "left" }}>
          Table: {table}
        </Text>
        <Text style={{ flex: 2, fontSize: 20, textAlign: "center" }}>
          Items: 2
        </Text>
        <Text style={{ flex: 3, fontSize: 20, textAlign: "right" }}>
          Total: RM14.50
        </Text>
      </View>
      <TextInput
        value={currentOrder}
        placeholder="name"
        onChangeText={setCurrentOrder}
      />
      <Button title="Add Name" onPress={addOrder} />
      {showOrders()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    margin: 0,
  },
});
export default CartScreen;
