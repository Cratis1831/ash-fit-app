import Leaderboard from "@/components/Leaderboard";
import ProfileHeader from "@/components/ProfileHeader";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/utils/constants";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Stack, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Button, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerShown: false,
          // change background color of tab bar and header
          headerStyle: {
            backgroundColor: Colors.BACKGROUND_COLOR,
          },
        }}
      />
      <SafeAreaView style={styles.container}>
        <View
          style={
            {
              // flexDirection: "row",
              // justifyContent: "space-between",
              // alignItems: "center",
            }
          }
        >
          <ProfileHeader
            name={user?.fullName ?? "Guest"}
            email={user?.emailAddresses[0].emailAddress ?? ""}
            image={user?.imageUrl ?? ""}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <IconSymbol
              name="arrow.right.square"
              size={30}
              color={Colors.ACTIVE_TAB_ICON}
            />
          </TouchableOpacity>
        </View>
        <Divider />
        <Leaderboard />
      </SafeAreaView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  logoutButton: {
    // marginRight: 16,
    // padding: 8,
  },
});
