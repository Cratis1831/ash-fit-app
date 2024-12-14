import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useWorkoutStore } from "@/store";
import { Ionicons } from "@expo/vector-icons"; // Import necessary functions from date-fns
import { useElapsedTime } from "@/hooks/useElapsedTime";
import ExerciseView from "@/components/ExerciseView";

const Page = () => {
  const router = useRouter();
  const { workout, setWorkout, clearWorkout, addExercise } = useWorkoutStore();
  const [workoutName, setWorkoutName] = useState<string>(workout.name || "");
  // const [elapsedTime, setElapsedTime] = useState<string>("");
  const elapsedTime = useElapsedTime(
    workout.dateStarted ? workout.dateStarted.toISOString() : null
  );

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert("Error", "Workout name cannot be empty.");
      return;
    }
    setWorkout({
      ...workout,
      name: workoutName,
    });
  };

  const addExerciseToWorkout = () => {
    const exercise = {
      id: (workout.exercises?.length || 0) + 1,
      name: "Bench Press",
      bodyPart: "Chest",
      sets: [
        {
          id: 1,
          weight: 100,
          reps: 10,
          completed: false,
        },
        {
          id: 2,
          weight: 100,
          reps: 10,
          completed: false,
        },
        {
          id: 3,
          weight: 100,
          reps: 10,
          completed: false,
        },
      ],
    };
    addExercise(exercise);
  };

  const cancelWorkout = () => {
    clearWorkout();
    setWorkoutName("");
    router.dismiss();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.dismiss()}
              style={styles.toolbarButton}
              accessibilityLabel="Close"
            >
              <Ionicons name="chevron-down" size={24} color={"red"} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={saveWorkout}
              style={styles.saveButton}
              accessibilityLabel="Save Workout"
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter workout name..."
              value={workoutName ?? ""}
              onChangeText={(text) => setWorkoutName(text)}
              keyboardType="default"
            />

            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <View style={{ gap: 10 }}>
                {/* Display Elapsed Time */}
                <Text>{elapsedTime}</Text>
                {/* <Text>{JSON.stringify(workout || {}, null, 2)}</Text> */}
                <ExerciseView />
                <TouchableOpacity
                  style={styles.button}
                  onPress={addExerciseToWorkout}
                >
                  <Text style={styles.buttonText}>Add Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={cancelWorkout}>
                  <Text style={styles.buttonText}>Cancel Workout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    minWidth: 0,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "red",
    fontWeight: "bold",
  },
  toolbarButton: {
    marginHorizontal: 8,
  },
  saveButton: {
    marginHorizontal: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
