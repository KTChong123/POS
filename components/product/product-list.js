import { Text, View, FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { DUMMY_DATA } from "../../data/dummy";
import ProductItem from "./product-item";

const ProductList = () => {
  const renderItem = ({ item }) => {
    return (
      <ProductItem
        id={item.id}
        title={item.title}
        description={item.description}
      />
    );
  };
  return (
    <View>
      <Text>Product list</Text>
      <FlatList
        data={DUMMY_DATA}
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

export default ProductList;
