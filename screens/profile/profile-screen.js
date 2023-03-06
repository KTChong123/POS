import { useNavigation } from "@react-navigation/native";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const db = SQLite.openDatabase("example.db");
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState({});
  const [currentName, setCurrentName] = useState(undefined);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM names",
        null,
        (txObj, resultSet) => {
          setNames(resultSet.rows._array);
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
        <Text>Loading names...</Text>
      </View>
    );
  }

  const addName = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO names (name) values (?)",
        [currentName],
        (txObj, resultSet) => {
          let existingNames = [...names];
          existingNames.push({ id: resultSet.insertId, name: currentName });
          setNames(existingNames);
          setCurrentName(undefined);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const deleteName = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM names WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter((name) => name.id !== id);
            setNames(existingNames);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateName = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE names SET name = ? WHERE id = ?",
        [currentName, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names];
            const indexToUpdate = existingNames.findIndex(
              (name) => name.id === id
            );
            existingNames[indexToUpdate].name = currentName;
            setNames(existingNames);
            setCurrentName(undefined);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text>{name.name}</Text>
          <Button title="Update" onPress={() => updateName(name.id)} />
          <Button title="Delete" onPress={() => deleteName(name.id)} />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={currentName}
        placeholder="name"
        onChangeText={setCurrentName}
      />
      <Button title="Add Name" onPress={addName} />
      {showNames()}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
      <Button
        title="some profile"
        onPress={() => navigation.navigate("Profile", { profileId: 1 })}
      />
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
    margin: 8,
  },
});
export default ProfileScreen;
