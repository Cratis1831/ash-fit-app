import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workouts, exercises, sets } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { eq, asc } from "drizzle-orm";
import { Colors } from "@/utils/constants";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          // change background color of tab bar and header
          headerStyle: {
            backgroundColor: Colors.BACKGROUND_COLOR,
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* if no data show empty state view */}
        {Object.keys(groupedData).length === 0 && (
          <Text>No workouts found</Text>
        )}
        {Object.values(groupedData).map(({ workout, sets }) => (
          <View style={styles.itemContainer} key={workout.id}>
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
                set: (typeof groupedData)[number]["sets"][number],
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
        ))}
      </ScrollView>
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
