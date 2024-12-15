import { ScrollView, StyleSheet, Text, View } from "react-native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workouts, exercises, sets } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm";

const Page = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const { data } = useLiveQuery(
    drizzleDb
      .select()
      .from(workouts)
      // .where(eq(workouts.id, Number(id)))
      .leftJoin(sets, eq(workouts.id, sets.workoutId))
      .leftJoin(exercises, eq(sets.exerciseId, exercises.id))
  );

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {data.map((item, index) => (
          <Text key={item.workout.id + index}>
            {/* {item.workout.name} - {item.workout.dateStarted}
            {item.set?.id} - {item.exercise?.name} - {item.set?.reps} -{" "}
            {item.set?.weight} */}
            {/* {JSON.stringify(item, null, 2)} */}
            {item.workout.name} - {item.set?.id} - {item.exercise?.name} -{" "}
            {item.set?.reps} - {item.set?.weight}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
