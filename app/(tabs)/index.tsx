import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { useWorkoutStore } from "@/store";

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
        true // reverse the animation
      );
    }
  }, [workout]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pulseOpacity.value,
    };
  });

  const handleGoToWorkout = () => {
    setWorkout({ name: "", id: "123", dateStarted: new Date(), note: null });
    router.push("/create");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerRight: () =>
            workout.id && (
              <TouchableOpacity
                onPress={handleGoToWorkout}
                style={styles.resumeButton}
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
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleGoToWorkout}
          >
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  button: {
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resumeButton: {
    marginVertical: 10,
    marginRight: 10,
  },
  resumeText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
