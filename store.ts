import { create } from "zustand";
import { Exercise, Workout, Set } from "./types";

interface WorkoutStore {
  workout: Workout;
  setWorkout: (workout: Workout) => void;
  clearWorkout: () => void;
  addExercise: (exercise: Exercise) => void;
  addSet: (newSet: Set, exerciseId: number) => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workout: {
    name: "",
    dateStarted: null,
    exercises: [],
    note: "",
    id: "",
  },
  setWorkout: (workout) => set({ workout }),
  clearWorkout: () =>
    set({
      workout: {
        name: "",
        dateStarted: null,
        note: null,
        id: null,
        exercises: [],
      },
    }),
  addExercise: (exercise) =>
    set((state) => ({
      workout: {
        ...state.workout,
        exercises: [...state.workout.exercises, exercise],
      },
    })),
  addSet: (newSet, exerciseId) =>
    set((state) => {
      const updatedExercises = state.workout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          // Renumber all sets, including the new one
          const updatedSets = [...exercise.sets, newSet].map((set, index) => ({
            ...set,
            id: index + 1, // Ensure sequential IDs
          }));
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });

      return {
        workout: {
          ...state.workout,
          exercises: updatedExercises,
        },
      };
    }),
}));
