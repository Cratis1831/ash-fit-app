import Leaderboard from "@/components/Leaderboard";
import ProfileHeader from "@/components/ProfileHeader";
import { Colors } from "@/utils/constants";
import { useAuth } from "@clerk/clerk-react";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Button, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const { signOut } = useAuth();
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
        <ProfileHeader
          name="A S"
          email="a.s@icloud.com"
          image={require("@/assets/profiles/aiden.jpeg")}
        />
        <Divider />

        <Pressable onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Pressable>
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
});
