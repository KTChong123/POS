import { useNavigation } from "@react-navigation/native";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import ApiProductItem from "./api-product-item";
import { RefreshControl } from "react-native-gesture-handler";

const ApiProductList = ({ table, category }) => {
  const navigation = useNavigation();

  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();

  useEffect(() => {
    console.log(category);
    fetch(
      `https://web-production-820e.up.railway.app/api/products-by-category/${category}`
    )
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
    return (
      <ApiProductItem
        table={table}
        category={category}
        id={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
      />
    );
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
      <View style={{ height: "83%" }}>
        <Text style={{ alignSelf: "center", color: "green" }}>
          Status: API Called
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{category}:</Text>
        <FlatList
          data={response}
          keyExtractor={(item) => item.id}
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

export default ApiProductList;
