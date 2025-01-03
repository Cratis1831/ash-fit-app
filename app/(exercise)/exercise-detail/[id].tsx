import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { exercises } from "@/db/schema";
import { eq } from "drizzle-orm";

const ExerciseDetail = () => {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  if (!id) {
    return <Text>Invalid exercise id</Text>;
  }

  const query = drizzleDb
    .select()
    .from(exercises)
    .where(eq(exercises.id, parseInt(id as string)))
    .limit(1);

  const { data } = useLiveQuery(query);

  // Initialize the `name` state with the database value
  useEffect(() => {
    if (data?.length) {
      setName(data[0].name || "");
    }
  }, [data]);

  // Debounce mechanism for `name`
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name);
    }, 500); // Wait for 500ms after the user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [name]);

  // Update database when `debouncedName` changes
  useEffect(() => {
    const updateDatabase = async () => {
      if (debouncedName && debouncedName !== data?.[0]?.name) {
        try {
          console.log("Updating database with new name:", debouncedName);
          await drizzleDb
            .update(exercises)
            .set({ name: debouncedName })
            .where(eq(exercises.id, parseInt(id as string)));
          console.log("Exercise name updated successfully");
        } catch (error) {
          console.error("Error updating exercise:", error);
        }
      }
    };

    updateDatabase();
  }, [debouncedName, data, drizzleDb, id]);

  if (!data || !data[0]) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.largeTextInput}
        value={name}
        onChangeText={setName}
        placeholder="Enter exercise name"
      />
      <Text>{data[0].bodyPart}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  largeTextInput: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ExerciseDetail;
