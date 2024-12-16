import { StyleSheet, Text, View } from "react-native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { workouts, exercises, sets } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { eq, asc } from "drizzle-orm";
import { Colors } from "@/utils/constants";
import { Stack } from "expo-router";

const Page = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const query = drizzleDb.select().from(exercises).orderBy(exercises.name);

  const { data } = useLiveQuery<typeof query>(query);
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
      <View style={styles.container}>
        {data?.map((exercise) => (
          <View key={exercise.id}>
            <Text>
              {exercise.name} - {exercise.bodyPart}
            </Text>
          </View>
        ))}
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
});
