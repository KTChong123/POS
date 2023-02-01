import { useNavigation } from "@react-navigation/native";
import { Button, View, Text } from "react-native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Profile screen</Text>
      <Button
        title="some profile"
        onPress={() => navigation.navigate("Profile", { profileId: 1 })}
      />
    </View>
  );
};

export default ProfileScreen;
