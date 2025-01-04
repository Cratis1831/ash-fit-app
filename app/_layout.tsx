import { Colors } from "@/utils/constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ActivityIndicator } from "react-native";
import { addDummyData } from "@/utils/dummyData";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// const db = SQLite.openDatabaseSync("db");

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const expoDb = openDatabaseSync("workouts.db");
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;
    addDummyData(db);
  }, [success]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <Suspense fallback={<ActivityIndicator />}>
        <SQLiteProvider
          databaseName="workouts.db"
          options={{ enableChangeListener: true }}
          useSuspense
        >
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: Colors.BACKGROUND_COLOR },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(workout)/create-workout/index"
              options={{
                title: "",
                presentation: "fullScreenModal",
                sheetGrabberVisible: false,
                headerShadowVisible: false,
                headerShown: true,
                // sheetExpandsWhenScrolledToEdge: true,
              }}
            />
            <Stack.Screen
              name="(exercise)/create-exercise/index"
              options={{
                title: "",
                presentation: "fullScreenModal",
                sheetGrabberVisible: false,
                headerShadowVisible: false,
                headerShown: true,
                // sheetExpandsWhenScrolledToEdge: true,
              }}
            />
            <Stack.Screen
              name="(exercise)/create-exercise/select-bodypart"
              options={{
                title: "",
                presentation: "fullScreenModal",
                sheetGrabberVisible: false,
                headerShadowVisible: false,
                headerShown: true,
                // sheetExpandsWhenScrolledToEdge: true,
              }}
            />
            <Stack.Screen
              name="(exercise)/add-exercise/index"
              options={{
                title: "",
                presentation: "formSheet",
                sheetGrabberVisible: false,
                headerShadowVisible: false,
                headerShown: true,
                gestureEnabled: false,
                // sheetExpandsWhenScrolledToEdge: true,
              }}
            />
            <Stack.Screen
              name="(exercise)/exercise-detail/[id]"
              options={{
                title: "",
                headerShadowVisible: false,
                headerShown: true,
                headerBackTitle: "Back",
              }}
            />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
