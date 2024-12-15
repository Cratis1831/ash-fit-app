import { create } from "zustand";

interface Set {
  id: number;
  weight: number;
  reps: number;
  completed: boolean;
}

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  sets: Set[];
}

interface Workout {
  name: string;
  dateStarted: Date | null;
  exercises: Exercise[];
}

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
  },
  setWorkout: (workout) => set({ workout }),
  clearWorkout: () =>
    set({ workout: { name: "", dateStarted: null, exercises: [] } }),
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
          // Add the new set to the correct exercise
          return { ...exercise, sets: [...exercise.sets, newSet] };
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
