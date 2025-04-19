import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Exercise, Workout, WorkoutExercise, WorkoutGoal } from "@/types/exercise";
import { workoutHistory } from "@/data/workouts";

interface WorkoutState {
  // Current workout
  currentWorkout: Workout | null;
  selectedExercises: WorkoutExercise[];
  isWorkoutActive: boolean;
  workoutStartTime: string | null;

  // History
  workoutHistory: Workout[];

  // Goals
  workoutGoals: WorkoutGoal[];

  // Actions
  addExerciseToWorkout: (exercise: Exercise) => void;
  removeExerciseFromWorkout: (exerciseId: string) => void;
  startWorkout: (name: string) => void;
  endWorkout: (notes?: string) => void;
  toggleExerciseCompleted: (exerciseId: string, completed: boolean) => void;
  updateExerciseStats: (exerciseId: string, stats: Partial<WorkoutExercise>) => void;
  addWorkoutGoal: (goal: Omit<WorkoutGoal, "id">) => void;
  updateWorkoutGoal: (goalId: string, updates: Partial<WorkoutGoal>) => void;
  deleteWorkoutGoal: (goalId: string) => void;
  clearCurrentWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentWorkout: null,
      selectedExercises: [],
      isWorkoutActive: false,
      workoutStartTime: null,
      workoutHistory: [...workoutHistory], // Initialize with mock data
      workoutGoals: [],

      addExerciseToWorkout: (exercise: Exercise) => {
        set((state) => ({
          selectedExercises: [
            ...state.selectedExercises,
            {
              ...exercise,
              completed: false,
              actualSets: exercise.sets,
              actualReps: exercise.reps,
              actualDuration: exercise.duration,
              actualDistance: exercise.distance,
            },
          ],
        }));
      },

      removeExerciseFromWorkout: (exerciseId: string) => {
        set((state) => ({
          selectedExercises: state.selectedExercises.filter(
            (exercise) => exercise.id !== exerciseId
          ),
        }));
      },

      startWorkout: (name: string) => {
        const now = new Date().toISOString();
        set((state) => {
          if (state.selectedExercises.length === 0) {
            return state;
          }

          return {
            currentWorkout: {
              id: now,
              name,
              date: now,
              exercises: [...state.selectedExercises],
              duration: 0,
              caloriesBurned: 0,
            },
            isWorkoutActive: true,
            workoutStartTime: now,
          };
        });
      },

      endWorkout: (notes?: string) => {
        const { currentWorkout, workoutStartTime } = get();

        if (!currentWorkout || !workoutStartTime) {
          return;
        }

        const endTime = new Date();
        const startTime = new Date(workoutStartTime);
        const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

        const completedExercises = currentWorkout.exercises.filter((ex) => ex.completed);

        // Calculate calories burned based on completed exercises
        const caloriesBurned = completedExercises.reduce((total, exercise) => {
          if (exercise.actualDuration) {
            return total + exercise.caloriesPerMinute * exercise.actualDuration;
          }
          // For strength exercises, estimate based on sets and reps
          if (exercise.actualSets && exercise.actualReps) {
            const estimatedDuration = (exercise.actualSets * exercise.actualReps) / 10; // rough estimate
            return total + exercise.caloriesPerMinute * estimatedDuration;
          }
          return total;
        }, 0);

        const finishedWorkout: Workout = {
          ...currentWorkout,
          duration: durationMinutes,
          caloriesBurned,
          notes,
        };

        set((state) => ({
          workoutHistory: [finishedWorkout, ...state.workoutHistory],
          currentWorkout: null,
          isWorkoutActive: false,
          workoutStartTime: null,
          selectedExercises: [],
        }));
      },

      toggleExerciseCompleted: (exerciseId: string, completed: boolean) => {
        set((state) => {
          const updatedExercises =
            state.currentWorkout?.exercises.map((exercise) =>
              exercise.id === exerciseId ? { ...exercise, completed } : exercise
            ) || [];

          return {
            currentWorkout: state.currentWorkout
              ? { ...state.currentWorkout, exercises: updatedExercises }
              : null,
          };
        });
      },

      updateExerciseStats: (exerciseId: string, stats: Partial<WorkoutExercise>) => {
        set((state) => {
          const updatedExercises =
            state.currentWorkout?.exercises.map((exercise) =>
              exercise.id === exerciseId ? { ...exercise, ...stats } : exercise
            ) || [];

          return {
            currentWorkout: state.currentWorkout
              ? { ...state.currentWorkout, exercises: updatedExercises }
              : null,
          };
        });
      },

      addWorkoutGoal: (goal: Omit<WorkoutGoal, "id">) => {
        const newGoal: WorkoutGoal = {
          ...goal,
          id: Date.now().toString(),
        };

        set((state) => ({
          workoutGoals: [...state.workoutGoals, newGoal],
        }));
      },

      updateWorkoutGoal: (goalId: string, updates: Partial<WorkoutGoal>) => {
        set((state) => ({
          workoutGoals: state.workoutGoals.map((goal) =>
            goal.id === goalId ? { ...goal, ...updates } : goal
          ),
        }));
      },

      deleteWorkoutGoal: (goalId: string) => {
        set((state) => ({
          workoutGoals: state.workoutGoals.filter((goal) => goal.id !== goalId),
        }));
      },

      clearCurrentWorkout: () => {
        set({
          currentWorkout: null,
          selectedExercises: [],
          isWorkoutActive: false,
          workoutStartTime: null,
        });
      },
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        workoutHistory: state.workoutHistory,
        workoutGoals: state.workoutGoals,
      }),
    }
  )
);
