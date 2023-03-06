import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, View, StyleSheet, Linking } from "react-native";
import {
  ApiFetchStack,
  HomeStack,
  ProfileStack,
  TableSelectStack,
} from "./stack";

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ flex: 1, paddingTop: 20, backgroundColor: "#99f6e4" }}
          >
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                height: 140,
              }}
            >
              <Image
                style={styles.logo}
                source={require("../assets/images/logos/logo.png")}
              />
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
              label="More info"
              onPress={() => Linking.openURL("https://google.com")}
              icon={() => <Ionicons name="information" size={22} />}
            />
          </SafeAreaView>
        );
      }}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="TableSelectStack"
        component={TableSelectStack}
        options={{
          title: "Select Table",
          drawerIcon: () => <Ionicons name="home" size={22} />,
        }}
      />
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "Home",
          drawerIcon: () => <Ionicons name="home" size={22} />,
        }}
      />
      <Drawer.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: "Profile",
          drawerIcon: () => (
            <MaterialCommunityIcons name="face-man-profile" size={22} />
          ),
        }}
      />
      <Drawer.Screen
        name="ApiFetchStack"
        component={ApiFetchStack}
        options={{
          title: "ApiFetch",
          drawerIcon: () => <Ionicons name="archive" size={22} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
