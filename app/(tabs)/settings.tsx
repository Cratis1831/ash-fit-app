import { Colors } from "@/utils/constants";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          // change background color of tab bar and header
          headerStyle: {
            backgroundColor: Colors.BACKGROUND_COLOR,
          },
        }}
      />
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
});
