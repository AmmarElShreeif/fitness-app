export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "legs"
  | "core"
  | "fullBody"
  | "cardio";

export type ExerciseCategory =
  | "strength"
  | "cardio"
  | "flexibility"
  | "hiit"
  | "yoga"
  | "calisthenics";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroups: MuscleGroup[];
  difficulty: DifficultyLevel;
  description: string;
  instructions: string[];
  caloriesPerMinute: number;
  imageUrl: string;
  duration?: number; // in minutes (for cardio)
  sets?: number; // for strength
  reps?: number; // for strength
  distance?: number; // for cardio (in km)
}

export interface WorkoutExercise extends Exercise {
  completed: boolean;
  actualSets?: number;
  actualReps?: number;
  actualDuration?: number; // in minutes
  actualDistance?: number; // in km
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: string; // ISO string
  exercises: WorkoutExercise[];
  duration: number; // in minutes
  caloriesBurned: number;
  notes?: string;
}

export interface WorkoutGoal {
  id: string;
  name: string;
  targetDate: string; // ISO string
  description: string;
  completed: boolean;
  type: "frequency" | "duration" | "distance" | "strength";
  target: number;
  current: number;
  unit: string;
}
