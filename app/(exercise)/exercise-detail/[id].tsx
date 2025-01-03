import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { exercises } from "@/db/schema";
import { eq } from "drizzle-orm";
import CustomButton from "@/components/ui/CustomButton";
import { useBodyPartStore } from "@/store";

const ExerciseDetail = () => {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const [exerciseName, setExerciseName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const { bodyPart, setBodyPart } = useBodyPartStore();

  if (!id) {
    return <Text>Invalid exercise id</Text>;
  }

  const query = drizzleDb
    .select()
    .from(exercises)
    .where(eq(exercises.id, parseInt(id as string)))
    .limit(1);

  const { data } = useLiveQuery(query);

  // Initialize the `name` state with the database value and avoid re-setting it unnecessarily
  useEffect(() => {
    if (data?.length) {
      setExerciseName(data[0].name || "");
      setBodyPart(data[0].bodyPart || ""); // Set the initial body part as well
    }
  }, [data, setBodyPart]);

  // Debounce mechanism for `name`
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(exerciseName);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [exerciseName]);

  // Update the database when debounced name or body part changes
  useEffect(() => {
    if (!data || !debouncedName || bodyPart === undefined) return; // Skip if no data or no change

    const updateDatabase = async () => {
      const currentName = debouncedName || data[0]?.name;
      const currentBodyPart = bodyPart || data[0]?.bodyPart;

      // Update the database only if there are changes
      if (
        currentName !== data[0]?.name ||
        currentBodyPart !== data[0]?.bodyPart
      ) {
        try {
          console.log("Updating database with new values:", {
            name: currentName,
            bodyPart: currentBodyPart,
          });
          await drizzleDb
            .update(exercises)
            .set({ name: currentName, bodyPart: currentBodyPart })
            .where(eq(exercises.id, parseInt(id as string)));
          console.log("Exercise updated successfully");
        } catch (error) {
          console.error("Error updating exercise:", error);
        }
      }
    };

    updateDatabase();
  }, [debouncedName, bodyPart, data]);

  if (!data || !data[0]) {
    return (
      <ActivityIndicator size={"large"} style={styles.activityIndicator} />
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.largeTextInput}
        value={exerciseName}
        onChangeText={setExerciseName}
        placeholder="Enter exercise name"
      />
      <CustomButton
        title={bodyPart || data[0].bodyPart || "Select a Bodypart"}
        accessibilityLabel="Select a Bodypart"
        onPress={() =>
          router.push("/(exercise)/create-exercise/select-bodypart")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  largeTextInput: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // size: "large",
  },
});

export default ExerciseDetail;
