import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workouts, exercises, sets } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { eq, asc } from "drizzle-orm";
import { Colors } from "@/utils/constants";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";

interface ExercisePageProps {
  selectionMode: boolean;
}
const Page = () => {
  const { selectionMode } = useLocalSearchParams();
  const { workout, addExercise } = useWorkoutStore();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const query = drizzleDb.select().from(exercises).orderBy(exercises.name);

  const { data } = useLiveQuery(query);

  const addExerciseToWorkout = (
    exerciseId: number,
    exerciseName: string,
    bodyPart: string
  ) => {
    const eId = (workout.exercises?.length || 0) + 1;
    const exercise = {
      id: eId,
      name: exerciseName,
      bodyPart: bodyPart,
      sets: [{ exerciseId, id: 1, weight: "", reps: "", completed: false }],
    };
    addExercise(exercise); // This now adds an exercise via the store
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
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 16, gap: 16 }}>
              <TouchableOpacity
                onPress={() => {}}
                accessibilityLabel="Search Exercises"
              >
                <Ionicons
                  name="search"
                  size={28}
                  color={Colors.PRIMARY_BUTTON_TEXT}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                accessibilityLabel="Add a New Exercise"
              >
                <Ionicons
                  name="add"
                  size={28}
                  color={Colors.PRIMARY_BUTTON_TEXT}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (selectionMode == "addToWorkout") {
                  // Add exercise to workout

                  addExerciseToWorkout(item.id, item.name!, item.bodyPart!);

                  router.canDismiss();
                  router.push("/create-workout");
                } else {
                  // Navigate to exercise details
                  console.log("Navigate to exercise details for: ", item.name);
                }
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{item.name?.charAt(0)}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <Text style={styles.bodyPart}>{item.bodyPart}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Center vertically
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.INPUT_BORDER_COLOR,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY_BUTTON_TEXT,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.BACKGROUND_COLOR,
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    // color: Colors.,
  },
  bodyPart: {
    fontSize: 14,
    color: Colors.COLORED_BUTTON_BACKGROUND,
  },
});
