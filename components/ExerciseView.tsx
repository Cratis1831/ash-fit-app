import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useWorkoutStore } from "@/store";

const ExerciseView = () => {
  const { workout, setWorkout } = useWorkoutStore();
  return (
    <View style={styles.container}>
      {workout.exercises?.map((exercise) => (
        <View style={styles.exerciseContainer} key={exercise.id}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
          </View>

          {/* Sets Header */}
          <View style={styles.setsHeader}>
            <View style={styles.setHeaderItem}>
              <Text style={styles.setsHeaderText}>SET</Text>
            </View>
            <View style={styles.setHeaderItem}>
              <Text style={styles.setsHeaderText}>PREVIOUS</Text>
            </View>
            <View style={styles.setHeaderItem}>
              <Text style={styles.setsHeaderText}>WEIGHT</Text>
            </View>
            <View style={styles.setHeaderItem}>
              <Text style={styles.setsHeaderText}>REPS</Text>
            </View>
          </View>

          {/* Sets for each exercise */}
          {exercise.sets?.map((set) => (
            <View style={styles.setContainer} key={set.id}>
              <View style={styles.setItem}>
                <Text style={styles.setText}>{set.id}</Text>
              </View>
              <View style={styles.setItem}>
                <Text style={styles.setText}>previous</Text>
              </View>
              <View style={styles.setItem}>
                <TextInput
                  style={styles.input}
                  value={set.weight.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setWorkout({
                      ...workout,
                      exercises: workout.exercises.map((ex) =>
                        ex.id === exercise.id
                          ? {
                              ...ex,
                              sets: ex.sets.map((s) =>
                                s.id === set.id
                                  ? { ...s, weight: parseFloat(text) }
                                  : s
                              ),
                            }
                          : ex
                      ),
                    });
                  }}
                />
              </View>
              <View style={styles.setItem}>
                <TextInput
                  style={styles.input}
                  value={set.reps.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setWorkout({
                      ...workout,
                      exercises: workout.exercises.map((ex) =>
                        ex.id === exercise.id
                          ? {
                              ...ex,
                              sets: ex.sets.map((s) =>
                                s.id === set.id
                                  ? { ...s, reps: parseInt(text, 10) }
                                  : s
                              ),
                            }
                          : ex
                      ),
                    });
                  }}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Add Set</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ExerciseView;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  exerciseContainer: {
    gap: 5,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  setsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  setHeaderItem: {
    width: 75, // Fixed width for each header item
    justifyContent: "center",
    alignItems: "center",
  },
  setsHeaderText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  setContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  setItem: {
    width: 75, // Fixed width for each set item
    justifyContent: "center",
    alignItems: "center",
  },
  setText: {
    textAlign: "center",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    width: 75, // Fixed width for the input field
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#f00", // Red button
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
