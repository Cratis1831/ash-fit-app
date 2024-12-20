import Leaderboard from "@/components/Leaderboard";
import ProfileHeader from "@/components/ProfileHeader";
import { Colors } from "@/utils/constants";
import { Stack } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
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
