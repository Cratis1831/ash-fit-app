import { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useElapsedTime } from "@/hooks/useElapsedTime";
import ExerciseView from "@/components/ExerciseView";
import { Colors } from "@/utils/constants";

const Page = () => {
  const router = useRouter();
  const { workout, setWorkout, clearWorkout, addExercise } = useWorkoutStore();
  const [workoutName, setWorkoutNameState] = useState<string>(
    workout.name || ""
  );
  const elapsedTime = useElapsedTime(
    workout.dateStarted?.toISOString() || null
  );

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert("Error", "Workout name cannot be empty.");
      return;
    }
    setWorkout(workout); // This now updates the workout name in the store
  };

  const addExerciseToWorkout = () => {
    const eId = (workout.exercises?.length || 0) + 1;
    const exercise = {
      id: eId,
      name: "Bench Press",
      bodyPart: "Chest",
      sets: [
        { exerciseId: eId, id: 1, weight: "", reps: "", completed: false },
      ],
    };
    addExercise(exercise); // This now adds an exercise via the store
  };

  const cancelWorkout = () => {
    clearWorkout(); // This now clears the workout in the store
    setWorkoutNameState(""); // Reset the workout name locally
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
              <Ionicons
                name="chevron-down"
                size={24}
                color={Colors.PRIMARY_BUTTON_TEXT}
              />
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
              value={workoutName}
              onChangeText={(text) => setWorkoutNameState(text)} // Manage locally
              keyboardType="default"
            />

            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <Text style={styles.elapsedTimeText}>{elapsedTime}</Text>
              <ExerciseView />
              <TouchableOpacity
                style={styles.button}
                onPress={addExerciseToWorkout}
              >
                <Text style={styles.buttonText}>Add Exercise</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 24 }]}
                onPress={cancelWorkout}
              >
                <Text style={styles.destructiveButtonText}>Cancel Workout</Text>
              </TouchableOpacity>
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
    borderColor: Colors.INPUT_BORDER_COLOR,
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
    color: Colors.PRIMARY_BUTTON_TEXT,
    fontWeight: "bold",
  },
  destructiveButtonText: {
    color: Colors.DESTRUCTIVE_BUTTON_TEXT,
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
    color: Colors.PRIMARY_BUTTON_TEXT,
  },
  elapsedTimeText: {
    marginBottom: 10,
  },
});
