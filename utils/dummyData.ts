import { exercises, workouts, sets } from "@/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import AsyncStorage from "expo-sqlite/kv-store";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  const value = AsyncStorage.getItemSync("initialized");
  if (value) return;

  await db.insert(workouts).values([
    {
      name: "Chest Day",
      dateStarted: new Date().toISOString(),
      note: "This is a note",
    },
    {
      name: "Leg Day",
      dateStarted: new Date().toISOString(),
    },
    {
      name: "Back Day",
      dateStarted: new Date().toISOString(),
    },
  ]);
  await db.insert(exercises).values([
    {
      name: "Bench Press",
      bodyPart: "Chest",
    },
    {
      name: "Squat",
      bodyPart: "Legs",
    },
    {
      name: "Deadlift",
      bodyPart: "Back",
    },
  ]);

  await db.insert(sets).values([
    {
      weight: "100",
      reps: "10",
      workoutId: 1,
      exerciseId: 1,
    },
    {
      weight: "200",
      reps: "5",
      workoutId: 1,
      exerciseId: 1,
    },
    {
      weight: "300",
      reps: "3",
      workoutId: 1,
      exerciseId: 1,
    },
    {
      weight: "100",
      reps: "10",
      workoutId: 2,
      exerciseId: 2,
    },
    {
      weight: "200",
      reps: "5",
      workoutId: 2,
      exerciseId: 2,
    },
    {
      weight: "300",
      reps: "3",
      workoutId: 2,
      exerciseId: 2,
    },
    {
      weight: "100",
      reps: "10",
      workoutId: 3,
      exerciseId: 3,
    },
    {
      weight: "200",
      reps: "5",
      workoutId: 3,
      exerciseId: 3,
    },
    {
      weight: "300",
      reps: "3",
      workoutId: 3,
      exerciseId: 3,
    },
  ]);
  AsyncStorage.setItemSync("initialized", "true");
};
