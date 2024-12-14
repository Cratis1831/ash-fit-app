import { create } from "zustand";
import { Exercise, Workout } from "@/types";

interface WorkoutState {
  workout: Workout;
  setWorkout: (workout: Workout) => void;
  addExercise: (exercise: Exercise) => void;
  clearWorkout: () => void;
}

// Zustand store for workout state
export const useWorkoutStore = create<WorkoutState>((set) => ({
  workout: {
    name: "",
    dateStarted: new Date(),
    note: null,
    id: null,
    exercises: [],
  },
  addExercise: (exercise: Exercise) =>
    set((state) => {
      const exercises = state.workout.exercises || [];
      return {
        workout: {
          ...state.workout,
          exercises: [...exercises, exercise],
        },
      };
    }),
  setWorkout: (workout) => set(() => ({ workout })),
  clearWorkout: () =>
    set(() => ({
      workout: {
        name: "",
        dateStarted: null,
        note: null,
        id: null,
        exercises: [],
      },
    })),
}));
