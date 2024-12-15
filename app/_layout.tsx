import { Colors } from "@/utils/constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.BACKGROUND_COLOR },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-workout/index"
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
