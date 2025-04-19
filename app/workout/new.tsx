import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { Button } from "@/components/Button";
import { ExerciseCard } from "@/components/ExerciseCard";
import { useWorkoutStore } from "@/store/workout-store";
import { X, Plus, Play, ArrowLeft } from "lucide-react-native";

export default function NewWorkoutScreen() {
  const { selectedExercises, removeExerciseFromWorkout, startWorkout } = useWorkoutStore();
  const [workoutName, setWorkoutName] = useState("My Workout");

  const handleStartWorkout = () => {
    if (selectedExercises.length === 0) {
      Alert.alert("No Exercises", "Please add at least one exercise to your workout.", [
        { text: "OK" },
      ]);
      return;
    }

    startWorkout(workoutName);
    router.push("/workout");
  };

  const handleAddExercises = () => {
    router.push("/exercises");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Workout",
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
          <View style={styles.nameContainer}>
            <Text style={styles.label}>Workout Name</Text>
            <TextInput
              style={styles.nameInput}
              value={workoutName}
              onChangeText={setWorkoutName}
              placeholder="Enter workout name"
              placeholderTextColor={colors.textLight}
            />
          </View>

          <View style={styles.exercisesContainer}>
            <View style={styles.exercisesHeader}>
              <Text style={styles.exercisesTitle}>Exercises</Text>
              <Text style={styles.exercisesCount}>{selectedExercises.length} selected</Text>
            </View>

            {selectedExercises.length > 0 ? (
              selectedExercises.map((exercise) => (
                <View
                  key={exercise.id}
                  style={styles.exerciseItem}
                >
                  <ExerciseCard
                    exercise={exercise}
                    onPress={() => {}}
                    compact
                  />
                  <X
                    size={20}
                    color={colors.error}
                    onPress={() => removeExerciseFromWorkout(exercise.id)}
                    style={styles.removeIcon}
                  />
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No exercises added yet</Text>
                <Text style={styles.emptySubtext}>Add exercises to create your workout</Text>
              </View>
            )}

            <Button
              title="Add Exercises"
              variant="outline"
              icon={
                <Plus
                  size={18}
                  color={colors.primary}
                />
              }
              onPress={handleAddExercises}
              style={styles.addButton}
              fullWidth
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Start Workout"
            icon={
              <Play
                size={18}
                color="white"
              />
            }
            onPress={handleStartWorkout}
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
  nameContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 8,
  },
  nameInput: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exercisesContainer: {
    marginBottom: 24,
  },
  exercisesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  exercisesCount: {
    fontSize: 14,
    color: colors.textLight,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  removeIcon: {
    marginLeft: 12,
    padding: 4,
  },
  emptyContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
  },
  addButton: {
    marginTop: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
