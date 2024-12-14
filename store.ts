import { create } from "zustand";
interface Workout {
  name: string | null;
  dateStarted: Date | null;
  note: string | null;
  id: string | null;
}

interface WorkoutState {
  workout: Workout;
  setWorkout: (workout: Workout) => void;
  clearWorkout: () => void;
}

// Zustand store for workout state
export const useWorkoutStore = create<WorkoutState>((set) => ({
  workout: {
    name: "",
    dateStarted: new Date(),
    note: null,
    id: null,
  },
  setWorkout: (workout) => set(() => ({ workout })),
  clearWorkout: () =>
    set(() => ({
      workout: { name: "", dateStarted: null, note: null, id: null },
    })),
}));
