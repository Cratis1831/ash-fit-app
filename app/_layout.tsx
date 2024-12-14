import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="create/index"
        options={{
          title: "",
          presentation: "fullScreenModal",
          sheetGrabberVisible: false,
          headerShadowVisible: false,
          headerShown: true,
          // sheetExpandsWhenScrolledToEdge: true,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
