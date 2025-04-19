import { Workout } from "@/types/exercise";
import { exercises } from "./exercises";

export const workoutHistory: Workout[] = [
  {
    id: "1",
    name: "Morning Cardio",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    exercises: [
      {
        ...exercises[2], // Running
        completed: true,
        actualDuration: 25,
        actualDistance: 4.2,
      },
      {
        ...exercises[10], // Jump Rope
        completed: true,
        actualDuration: 10,
      },
    ],
    duration: 35,
    caloriesBurned: 420,
    notes: "Felt great today, increased pace during the last mile.",
  },
  {
    id: "2",
    name: "Upper Body Strength",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    exercises: [
      {
        ...exercises[0], // Push-ups
        completed: true,
        actualSets: 3,
        actualReps: 12,
      },
      {
        ...exercises[4], // Pull-ups
        completed: true,
        actualSets: 3,
        actualReps: 6,
      },
      {
        ...exercises[9], // Dumbbell Rows
        completed: true,
        actualSets: 3,
        actualReps: 10,
      },
    ],
    duration: 45,
    caloriesBurned: 320,
    notes: "Increased weight on dumbbell rows.",
  },
  {
    id: "3",
    name: "Full Body HIIT",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    exercises: [
      {
        ...exercises[8], // Burpees
        completed: true,
        actualSets: 4,
        actualReps: 12,
      },
      {
        ...exercises[1], // Squats
        completed: true,
        actualSets: 3,
        actualReps: 20,
      },
      {
        ...exercises[3], // Plank
        completed: true,
        actualDuration: 2,
      },
    ],
    duration: 30,
    caloriesBurned: 380,
    notes: "Tough workout but felt accomplished.",
  },
];

export const getRecentWorkouts = (count: number): Workout[] => {
  return [...workoutHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getTotalStats = () => {
  return {
    totalWorkouts: workoutHistory.length,
    totalDuration: workoutHistory.reduce((sum, workout) => sum + workout.duration, 0),
    totalCalories: workoutHistory.reduce((sum, workout) => sum + workout.caloriesBurned, 0),
    workoutsByCategory: {
      strength: 1,
      cardio: 1,
      hiit: 1,
      yoga: 0,
      flexibility: 0,
      calisthenics: 0,
    },
  };
};
