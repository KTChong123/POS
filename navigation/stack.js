import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home-screen";
import ProductPage from "../screens/product-page";
import ProfileDetailScreen from "../screens/profile/profile-details";
import ProfileScreen from "../screens/profile/profile-screen";
import { navOptions } from "./options";
import { HomeTabs } from "./tab";

const Stack = createStackNavigator();

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
