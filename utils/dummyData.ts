import { exercises, bodyParts } from "@/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import AsyncStorage from "expo-sqlite/kv-store";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  const value = AsyncStorage.getItemSync("initialized");
  if (value) return;

  await db.insert(bodyParts).values([
    {
      name: "Chest",
    },
    {
      name: "Legs",
    },
    {
      name: "Back",
    },
    {
      name: "Shoulders",
    },
    {
      name: "Biceps",
    },
    {
      name: "Abs",
    },
    {
      name: "Triceps",
    },
    {
      name: "Calves",
    },
    {
      name: "Forearms",
    },
    {
      name: "Glutes",
    },
    {
      name: "Hamstrings",
    },
    {
      name: "Quads",
    },
    {
      name: "Traps",
    },
    {
      name: "Lats",
    },
    {
      name: "Obliques",
    },
    {
      name: "Lower Back",
    },
    {
      name: "Upper Back",
    },
    {
      name: "Neck",
    },
    {
      name: "Traps",
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
  AsyncStorage.setItemSync("initialized", "true");
};
