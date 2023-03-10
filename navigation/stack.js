import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApiFetchScreen from "../screens/api-fetch-product";
import ApiProductPage from "../screens/api-product-page";
import TableSelectScreen from "../screens/table-select";
import MenuPage from "../screens/menu-page";
import CategoryPage from "../screens/category-page";
import HomeScreen from "../screens/home-screen";
import ProductPage from "../screens/product-page";
import ProfileDetailScreen from "../screens/profile/profile-details";
import ProfileScreen from "../screens/profile/profile-screen";
import { navOptions } from "./options";
import { HomeTabs } from "./tab";

const Stack = createStackNavigator();

export const TableSelectStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Select Table" component={TableSelectScreen} />
      <Stack.Screen name="Category" component={CategoryPage} />
      <Stack.Screen name="Menu" component={MenuPage} />
    </Stack.Navigator>
  );
};
export const HomeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Product" component={ProductPage} />
    </Stack.Navigator>
  );
};
export const ProfileStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Profiles" component={ProfileScreen} />
      <Stack.Screen name="Profile" component={ProfileDetailScreen} />
    </Stack.Navigator>
  );
};
export const ApiFetchStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="ApiFetch" component={ApiFetchScreen} />
      <Stack.Screen name="ApiProduct" component={ApiProductPage} />
    </Stack.Navigator>
  );
};
