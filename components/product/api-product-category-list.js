import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import ApiProductItem from "./api-product-item";
import ApiProductCategoryItem from "./api-product-category-item";
import { RefreshControl } from "react-native-gesture-handler";

const ApiProductCategoryList = ({ table }) => {
  const navigation = useNavigation();

  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();

  useEffect(() => {
    fetch("https://web-production-820e.up.railway.app/api/products-categories/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setResponse(error);
        }
      );
  }, []);

  const renderItem = ({ item }) => {
    return <ApiProductCategoryItem table={table} category={item.category} />;
  };

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    if (error) {
      return <Text style={{ alignSelf: "center" }}>Error: {error}</Text>;
    }
    console.log(response);
    return (
      <View style={{ height: "95%" }}>
        <Text style={{ alignSelf: "center", color: "green" }}>
          Status: API Called
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Category:</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Menu", {
              table,
              category: "All",
            })
          }
        >
          <Text>All</Text>
        </TouchableOpacity>
        <FlatList
          data={response}
          keyExtractor={(item) => item.category}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => console.log("refreshing...")}
            />
          }
        />
      </View>
    );
  };
  return (
    <View>
      <Text style={{ alignSelf: "center" }}>API fetch screen</Text>
      {getContent()}
    </View>
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
export default ApiProductCategoryList;
