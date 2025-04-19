import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { Button } from "@/components/Button";
import { WorkoutTimer } from "@/components/WorkoutTimer";
import { useWorkoutStore } from "@/store/workout-store";
import { Check, X, ArrowLeft, Save } from "lucide-react-native";

export default function ActiveWorkoutScreen() {
  const {
    currentWorkout,
    isWorkoutActive,
    workoutStartTime,
    toggleExerciseCompleted,
    updateExerciseStats,
    endWorkout,
  } = useWorkoutStore();

  const [isPaused, setIsPaused] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isWorkoutActive || !currentWorkout) {
      router.replace("/");
    }
  }, [isWorkoutActive, currentWorkout]);

  if (!currentWorkout || !workoutStartTime) {
    return null;
  }

  const handleToggleTimer = () => {
    setIsPaused(!isPaused);
  };

  const handleResetTimer = () => {
    Alert.alert("End Workout", "Are you sure you want to end this workout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "End Workout",
        style: "destructive",
        onPress: () => {
          endWorkout(notes);
          router.replace("/");
        },
      },
    ]);
  };

  const handleToggleExercise = (exerciseId: string, completed: boolean) => {
    toggleExerciseCompleted(exerciseId, completed);
  };

  const handleUpdateExerciseStats = (exerciseId: string, field: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      const updates: any = {};
      updates[field] = numValue;
      updateExerciseStats(exerciseId, updates);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: currentWorkout.name,
          headerLeft: () => (
            <ArrowLeft
              size={24}
              color={colors.text}
              style={{ marginLeft: 8 }}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <SafeAreaView
        style={styles.container}
        edges={["bottom"]}
      >
        <ScrollView style={styles.scrollContainer}>
          <WorkoutTimer
            isActive={!isPaused}
            onToggle={handleToggleTimer}
            onReset={handleResetTimer}
            startTime={workoutStartTime ? new Date(workoutStartTime) : null}
          />

          <View style={styles.exercisesContainer}>
            <Text style={styles.sectionTitle}>Exercises</Text>

            {currentWorkout.exercises.map((exercise) => (
              <View
                key={exercise.id}
                style={styles.exerciseCard}
              >
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.completedToggle}>
                    {exercise.completed ? (
                      <Check
                        size={20}
                        color={colors.success}
                        onPress={() => handleToggleExercise(exercise.id, false)}
                      />
                    ) : (
                      <X
                        size={20}
                        color={colors.textLight}
                        onPress={() => handleToggleExercise(exercise.id, true)}
                      />
                    )}
                  </View>
                </View>

                <View style={styles.exerciseDetails}>
                  {exercise.sets && exercise.reps ? (
                    <View style={styles.statsRow}>
                      <View style={styles.statField}>
                        <Text style={styles.statLabel}>Sets</Text>
                        <TextInput
                          style={styles.statInput}
                          value={exercise.actualSets?.toString() || ""}
                          onChangeText={(value) =>
                            handleUpdateExerciseStats(exercise.id, "actualSets", value)
                          }
                          keyboardType="number-pad"
                        />
                      </View>

                      <View style={styles.statField}>
                        <Text style={styles.statLabel}>Reps</Text>
                        <TextInput
                          style={styles.statInput}
                          value={exercise.actualReps?.toString() || ""}
                          onChangeText={(value) =>
                            handleUpdateExerciseStats(exercise.id, "actualReps", value)
                          }
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>
                  ) : null}

                  {exercise.duration ? (
                    <View style={styles.statsRow}>
                      <View style={styles.statField}>
                        <Text style={styles.statLabel}>Duration (min)</Text>
                        <TextInput
                          style={styles.statInput}
                          value={exercise.actualDuration?.toString() || ""}
                          onChangeText={(value) =>
                            handleUpdateExerciseStats(exercise.id, "actualDuration", value)
                          }
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>
                  ) : null}

                  {exercise.distance ? (
                    <View style={styles.statsRow}>
                      <View style={styles.statField}>
                        <Text style={styles.statLabel}>Distance (km)</Text>
                        <TextInput
                          style={styles.statInput}
                          value={exercise.actualDistance?.toString() || ""}
                          onChangeText={(value) =>
                            handleUpdateExerciseStats(exercise.id, "actualDistance", value)
                          }
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.notesContainer}>
            <Text style={styles.sectionTitle}>Workout Notes</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add notes about your workout..."
              placeholderTextColor={colors.textLight}
              multiline
              numberOfLines={4}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Complete Workout"
            icon={
              <Save
                size={18}
                color="white"
              />
            }
            onPress={handleResetTimer}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  exercisesContainer: {
    marginBottom: 24,
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  completedToggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  statField: {
    flex: 1,
    marginRight: 12,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  statInput: {
    backgroundColor: colors.background,
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: colors.text,
  },
  notesContainer: {
    marginBottom: 24,
  },
  notesInput: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: "top",
  },
  footer: {
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
