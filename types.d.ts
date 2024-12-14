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
}
