import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Define the schema for the Workout table and its relationships to the Exercise and Set tables
export const workouts = sqliteTable("workout", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  dateStarted: text().notNull(),
  dateCompleted: text(),
  isCompleted: integer(),
  note: text(),
});

export const exercises = sqliteTable("exercise", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text(),
  bodyPart: text(),
});

export const sets = sqliteTable("set", {
  id: integer().primaryKey({ autoIncrement: true }),
  setNumber: integer(),
  workoutId: integer("workout_id")
    .notNull()
    .references(() => workouts.id),
  weight: text(),
  reps: text(),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id),
});
