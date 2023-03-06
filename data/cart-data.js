import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

const CartData = ({ table }) => {
  const db = SQLite.openDatabase("test1.db");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const [currentOrder, setCurrentOrder] = useState(undefined);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
      );
    });

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
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading orders...</Text>
      </View>
    );
  }

  const addOrder = () => {
    console.log("addOrder");
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO orders (name) values (?)",
        [currentOrder],
        (txObj, resultSet) => {
          let existingNames = [...orders];
          existingNames.push({ id: resultSet.insertId, name: currentOrder });
          setOrders(existingNames);
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
            let existingNames = [...orders].filter((name) => name.id !== id);
            setOrders(existingNames);
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
            let existingNames = [...orders];
            const indexToUpdate = existingNames.findIndex(
              (name) => name.id === id
            );
            existingNames[indexToUpdate].name = currentOrder;
            setOrders(existingNames);
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
        <Text style={{ flex: 5, fontSize: 20, textAlign: "right" }}>
          Item: 2 Total: RM14.50
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
export default CartData;
