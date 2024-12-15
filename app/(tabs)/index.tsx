import { useEffect } from "react";
import * as Crypto from "expo-crypto";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { useWorkoutStore } from "@/store";
import { Colors } from "@/utils/constants";
import Button from "@/components/Button";

const HomeScreen = () => {
  const router = useRouter();
  const { workout, setWorkout } = useWorkoutStore();

  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (workout.id !== null) {
      pulseOpacity.value = withRepeat(
        withTiming(0.5, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true // reverse animation
      );
    } else {
      pulseOpacity.value = 1; // Reset opacity when no workout
    }
  }, [workout]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pulseOpacity.value,
    };
  });

  const handleGoToWorkout = () => {
    setWorkout({
      name: "",
      id: Crypto.randomUUID(),
      dateStarted: new Date(),
      note: null,
      exercises: [],
    });
    router.push("/create-workout");
  };

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
          headerRight: () =>
            workout.id && (
              <TouchableOpacity
                onPress={() => router.push("/create-workout")}
                style={styles.resumeButton}
                accessibilityLabel="Resume your workout"
              >
                <Animated.Text style={[styles.resumeText, animatedStyle]}>
                  Resume
                </Animated.Text>
              </TouchableOpacity>
            ),
        }}
      />
      <View style={styles.container}>
        {!workout.id && (
          <Button
            onPress={handleGoToWorkout}
            accessibilityLabel="Start a new workout"
            text="Start Workout"
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Center vertically
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  resumeButton: {
    marginVertical: 10,
    marginRight: 10,
  },
  resumeText: {
    color: Colors.PRIMARY_BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
