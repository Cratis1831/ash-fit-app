import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { exercises } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { Colors } from "@/utils/constants";
import { router, Stack } from "expo-router";
import { useWorkoutStore } from "@/utils/store";
import { Ionicons } from "@expo/vector-icons";
import EmptyView from "@/components/EmptyView";

interface ExercisePageProps {
  selectionMode: boolean;
}
const Page = () => {
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
    // const eId = (workout.exercises?.length || 0) + 1;
    const exercise = {
      id: exerciseId,
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
                <Ionicons name="search" size={28} color={Colors.PRIMARY} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/create-exercise")}
                accessibilityLabel="Add a New Exercise"
              >
                <Ionicons name="add" size={28} color={Colors.PRIMARY} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <EmptyView
              icon="information-circle-outline"
              message="No exercises found"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                addExerciseToWorkout(item.id, item.name!, item.bodyPart!);
                router.dismiss();
                router.push("/create-workout");
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
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    marginVertical: 8,
    backgroundColor: Colors.BACKGROUND_COLOR,
    borderRadius: 8,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
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
