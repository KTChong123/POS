import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home-screen";
import ProductPage from "../screens/product-page";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductPage} />
    </Stack.Navigator>
  );
}
