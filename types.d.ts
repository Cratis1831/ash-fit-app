export interface Workout {
  name: string | null;
  dateStarted: Date | null;
  note: string | null;
  id: string | null;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  sets: Set[];
}

export interface Set {
  id: number;
  weight: number | string;
  reps: number | string;
  completed: boolean;
  exerciseId: number;
}
