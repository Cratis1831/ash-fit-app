import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workouts, exercises, sets } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { eq, asc } from "drizzle-orm";
import { Colors } from "@/utils/constants";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import EmptyView from "@/components/EmptyView";

// Define types for data structure
interface Workout {
  id: number;
  name: string;
}
interface GroupedData {
  [workoutId: number]: {
    workout: Workout;
    sets: {
      setNumber: number;
      exerciseName: string;
      reps: number;
      weight: number;
    }[];
  };
}

const Page = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const query = drizzleDb
    .select()
    .from(workouts)
    .leftJoin(sets, eq(workouts.id, sets.workoutId))
    .leftJoin(exercises, eq(sets.exerciseId, exercises.id))
    .orderBy(asc(workouts.id), asc(sets.id), asc(sets.setNumber));

  const { data } = useLiveQuery<typeof query>(query);

  // Group data by workout ID
  const groupedData: GroupedData = (data || []).reduce((acc, item) => {
    if (!item.workout) return acc;

    const workoutId = item.workout.id;

    if (!acc[workoutId]) {
      acc[workoutId] = {
        workout: item.workout,
        sets: [],
      };
    }

    if (item.set) {
      acc[workoutId].sets.push({
        setNumber: item.set?.setNumber ?? 0,
        exerciseName: item.exercise?.name || "Unknown Exercise",
        reps: Number(item.set?.reps) || 0, // Ensure valid number
        weight: Number(item.set?.weight) || 0, // Ensure valid number
      });
    }

    return acc;
  }, {} as GroupedData);

  const handleDeleteWorkout = async (workoutId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await drizzleDb
                .delete(workouts)
                .where(eq(workouts.id, workoutId));
            } catch (error) {
              console.error("Error deleting workout: ", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.pageBackground}>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.BACKGROUND_COLOR,
          },
        }}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={Object.values(groupedData)}
        keyExtractor={(item) => item.workout.id.toString()}
        ListEmptyComponent={
          <EmptyView
            icon="information-circle-outline"
            message="No workouts found"
          />
        }
        renderItem={({ item: { workout, sets } }) => (
          <View style={styles.itemContainer}>
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Ionicons
                name="trash"
                size={24}
                color="red"
                onPress={() => handleDeleteWorkout(workout.id)}
              />
            </View>
            {sets.map(
              (
                set: {
                  setNumber: string | number | boolean;
                  exerciseName: string | number | undefined;
                  reps: string | number | undefined;
                  weight: string | number | undefined;
                },
                index: number
              ) => (
                <View key={`${workout.id}-${index}`}>
                  <Text style={styles.details}>
                    {set.setNumber}: {set.exerciseName} - {set.reps} reps at{" "}
                    {set.weight} lbs
                  </Text>
                </View>
              )
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  pageBackground: {
    flex: 1, // Ensures it covers the entire screen
    backgroundColor: Colors.BACKGROUND_COLOR, // Match your desired background color
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR, // Keep this to ensure FlatList matches
  },
  itemContainer: {
    marginBottom: 20,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    fontSize: 16,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
