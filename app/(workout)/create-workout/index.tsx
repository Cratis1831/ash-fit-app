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
import { useWorkoutStore } from "@/utils/store";
import { Ionicons } from "@expo/vector-icons";
import { useElapsedTime } from "@/hooks/useElapsedTime";
import ExerciseView from "@/components/ExerciseView";
import { Colors } from "@/utils/constants";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { sets, workouts } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";

const Page = () => {
  const router = useRouter();
  const { workout, setWorkout, clearWorkout, addExercise } = useWorkoutStore();
  const [workoutName, setWorkoutNameState] = useState<string>(
    workout.name || ""
  );
  const elapsedTime = useElapsedTime(
    workout.dateStarted?.toISOString() || null
  );

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const saveWorkout = async () => {
    if (!workoutName.trim()) {
      Alert.alert("Error", "Workout name cannot be empty.");
      return;
    }
    setWorkout(workout); // This now updates the workout name in the store
    try {
      await drizzleDb.insert(workouts).values({
        name: workoutName,
        dateStarted:
          workout.dateStarted?.toISOString() ?? new Date().toISOString(),
        dateCompleted: new Date().toISOString(),
        note: workout.note || "",
        isCompleted: 1,
      });
      const result = await drizzleDb
        .select()
        .from(workouts)
        .orderBy(desc(workouts.dateStarted))
        .where(and(eq(workouts.name, workoutName), eq(workouts.isCompleted, 1)))
        .limit(1);

      const workoutId = result[0].id;

      workout.exercises?.map(async (exercise) => {
        await drizzleDb.insert(sets).values(
          exercise.sets.map((set) => ({
            setNumber: set.id,
            workoutId: workoutId,
            weight: set.weight.toString(),
            reps: set.reps.toString(),
            exerciseId: set.exerciseId,
          }))
        );
      });

      clearWorkout(); // This now clears the workout in the store
      setWorkoutNameState(""); // Reset the workout name locally
      router.dismissTo("/history");
      Alert.alert("Congratulations", "Workout completed!.");
    } catch (error) {
      console.error("Error saving workout: ", error);
    }
  };

  const addExerciseToWorkout = () => {
    try {
      router.push("/add-exercise");
    } catch (error) {
      console.error("Navigation failed", error);
    }
  };

  const cancelWorkout = () => {
    clearWorkout(); // This now clears the workout in the store
    setWorkoutNameState(""); // Reset the workout name locally
    router.dismissTo("/");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.dismissTo("/")}
              style={styles.toolbarButton}
              accessibilityLabel="Close"
            >
              <Ionicons name="chevron-down" size={24} color={Colors.PRIMARY} />
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
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter workout name..."
              placeholderTextColor={Colors.INACTIVE_TAB_ICON}
              value={workoutName}
              onChangeText={(text) => setWorkoutNameState(text)} // Manage locally
              keyboardType="default"
            />

            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <Text style={styles.elapsedTimeText}>{elapsedTime}</Text>

              {/* This is where the sets are added */}
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
    // borderWidth: 1,
    // borderColor: Colors.INPUT_BORDER_COLOR,
    // borderRadius: 8,
    // padding: 10,
    // marginBottom: 20,
    // minWidth: 0,

    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
    padding: 8,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
    fontSize: 16,
  },
  destructiveButtonText: {
    color: Colors.DESTRUCTIVE_BUTTON_TEXT,
    fontWeight: "bold",
    fontSize: 14,
  },
  toolbarButton: {
    marginHorizontal: 8,
    padding: 8,
  },
  saveButton: {
    marginHorizontal: 8,
    padding: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  elapsedTimeText: {
    marginBottom: 10,
  },
});
