import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useWorkoutStore } from "@/store";
import { Colors, WeightUnits } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ExerciseView = () => {
  const { workout, setWorkout, addSet } = useWorkoutStore();
  const setHeaders = ["SET", "PREVIOUS", "WEIGHT", "REPS", ""];

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

  const handleToggleSet = (
    exerciseId: number,
    setId: number,
    isChecked: boolean
  ) => {
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
                      // completed: !setItem.completed,

                      completed: isChecked,
                    }
                  : setItem
              ),
            }
          : exerciseItem
      ),
    });
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
                  style={[
                    styles.input,
                    set.completed && {
                      backgroundColor: Colors.DISABLED_BUTTON_BACKGROUND,
                      color: Colors.DISABLED_BUTTON_TEXT,
                    },
                  ]}
                  value={set.weight.toString()}
                  editable={!set.completed}
                  placeholder={WeightUnits.LBS}
                  placeholderTextColor={Colors.INACTIVE_TAB_ICON}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleSetChange(exercise.id, set.id, "weight", text)
                  }
                />
              </View>
              {/* Reps input */}
              <View style={styles.setItem}>
                <TextInput
                  style={[
                    styles.input,
                    set.completed && {
                      backgroundColor: Colors.DISABLED_BUTTON_BACKGROUND,
                      color: Colors.DISABLED_BUTTON_TEXT,
                    },
                  ]}
                  value={set.reps.toString()}
                  editable={!set.completed}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleSetChange(exercise.id, set.id, "reps", text)
                  }
                />
              </View>
              <View style={styles.setItem}>
                <BouncyCheckbox
                  size={25}
                  isChecked={set.completed}
                  fillColor={
                    set.reps === "" || set.weight === ""
                      ? Colors.INACTIVE_TAB_ICON
                      : Colors.PRIMARY
                  }
                  unFillColor={Colors.BACKGROUND_COLOR}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  disabled={set.reps === "" || set.weight === ""}
                  onPress={(isChecked: boolean) => {
                    set.completed = isChecked;
                    handleToggleSet(exercise.id, set.id, isChecked);
                  }}
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
    // gap: 20,
    marginBottom: 20,
    // backgroundColor: "#f9f9f9",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  setsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
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
    alignItems: "center", // Align items vertically for consistent layout
    marginBottom: 12,
    paddingVertical: 5, // Add some padding for touch targets
    gap: 10,
    borderColor: Colors.INPUT_BORDER_COLOR,
  },
  setItem: {
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 8,
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
    width: "90%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
  },
  destructiveButtonText: {
    color: Colors.DESTRUCTIVE_BUTTON_TEXT,
    fontWeight: "bold",
  },
});

export default ExerciseView;
