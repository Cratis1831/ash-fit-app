import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkoutStore } from "@/store";
import { Colors } from "@/utils/constants";

const ExerciseView = () => {
  const { workout, setWorkout, addSet } = useWorkoutStore();
  const setHeaders = ["SET", "PREVIOUS", "WEIGHT", "REPS"];

  const addSetToExercise = (exerciseId: number) => {
    const exercise = workout.exercises.find((e) => e.id === exerciseId);

    if (!exercise) {
      return;
    }

    const nextSetId = exercise.sets.length + 1;

    const newSet = {
      id: nextSetId,
      weight: "",
      reps: "",
      completed: false,
    };

    addSet(newSet, exerciseId);
  };

  const handleSetChange = (
    exerciseId: number,
    setId: number,
    field: "weight" | "reps",
    value: string
  ) => {
    const sanitizedText =
      field === "weight"
        ? value.replace(/[^0-9.]/g, "")
        : value.replace(/[^0-9]/g, "");
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((exerciseItem) =>
        exerciseItem.id === exerciseId
          ? {
              ...exerciseItem,
              sets: exerciseItem.sets.map((setItem) =>
                setItem.id === setId
                  ? {
                      ...setItem,
                      [field]: sanitizedText,
                    }
                  : setItem
              ),
            }
          : exerciseItem
      ),
    });
  };

  return (
    <View style={styles.container}>
      {/* Loop through the exercises for current workout */}
      {workout.exercises?.map((exercise) => (
        <View style={styles.exerciseContainer} key={exercise.id}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
          </View>

          <View style={styles.setsHeader}>
            {/* Display the Set Headers */}
            {setHeaders.map((header) => (
              <View style={styles.setHeaderItem} key={header}>
                <Text style={styles.setsHeaderText}>{header}</Text>
              </View>
            ))}
          </View>
          {/* Loop through the sets of the each exercises */}
          {exercise.sets?.map((set) => (
            <View style={styles.setContainer} key={set.id}>
              <View style={styles.setItem}>
                <Text style={styles.setText}>{set.id}</Text>
              </View>
              <View style={styles.setItem}>
                <Text style={styles.setText}>previous</Text>
              </View>
              {/* Weight input */}
              <View style={styles.setItem}>
                <TextInput
                  style={styles.input}
                  value={set.weight.toString()}
                  keyboardType="numbers-and-punctuation"
                  onChangeText={(text) =>
                    handleSetChange(exercise.id, set.id, "weight", text)
                  }
                />
              </View>
              {/* Reps input */}
              <View style={styles.setItem}>
                <TextInput
                  style={styles.input}
                  value={set.reps.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleSetChange(exercise.id, set.id, "reps", text)
                  }
                />
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={() => addSetToExercise(exercise.id)}
          >
            <Text style={styles.buttonText}>Add Set</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  exerciseContainer: {
    gap: 5,
    marginBottom: 20,
    // backgroundColor: "#f9f9f9",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.PRIMARY_BUTTON_TEXT,
  },
  setsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  setHeaderItem: {
    width: 75,
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
    width: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  setText: {
    textAlign: "center",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.INPUT_BORDER_COLOR,
    borderRadius: 4,
    padding: 8,
    width: 75,
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
});

export default ExerciseView;
