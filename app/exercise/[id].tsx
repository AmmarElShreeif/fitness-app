import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { Button } from "@/components/Button";
import { getExerciseById } from "@/data/exercises";
import { useWorkoutStore } from "@/store/workout-store";
import { Dumbbell, Clock, Flame, ArrowLeft, Plus } from "lucide-react-native";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = getExerciseById(id);
  const { addExerciseToWorkout, selectedExercises } = useWorkoutStore();

  const isAlreadyAdded = selectedExercises.some((ex) => ex.id === id);

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </SafeAreaView>
    );
  }

  const handleAddToWorkout = () => {
    addExerciseToWorkout(exercise);
    router.push("/workout/new");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: exercise.name,
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
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: exercise.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{exercise.name}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>
                {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            {exercise.sets && exercise.reps ? (
              <View style={styles.statItem}>
                <Dumbbell
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.statText}>
                  {exercise.sets} sets × {exercise.reps} reps
                </Text>
              </View>
            ) : null}

            {exercise.duration ? (
              <View style={styles.statItem}>
                <Clock
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.statText}>{exercise.duration} min</Text>
              </View>
            ) : null}

            <View style={styles.statItem}>
              <Flame
                size={20}
                color={colors.primary}
              />
              <Text style={styles.statText}>{exercise.caloriesPerMinute} cal/min</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{exercise.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {exercise.instructions.map((instruction, index) => (
              <View
                key={index}
                style={styles.instructionItem}
              >
                <Text style={styles.instructionNumber}>{index + 1}</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Target Muscle Groups</Text>
            <View style={styles.muscleGroupsContainer}>
              {exercise.muscleGroups.map((group, index) => (
                <View
                  key={index}
                  style={styles.muscleGroupBadge}
                >
                  <Text style={styles.muscleGroupText}>
                    {group.charAt(0).toUpperCase() + group.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Button
            title={isAlreadyAdded ? "Already in Workout" : "Add to Workout"}
            onPress={handleAddToWorkout}
            disabled={isAlreadyAdded}
            icon={
              <Plus
                size={18}
                color="white"
              />
            }
            style={styles.addButton}
            fullWidth
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
    height: 240,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
  },
  categoryContainer: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  category: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  statsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
    marginRight: 12,
    fontWeight: "600",
  },
  instructionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    lineHeight: 24,
  },
  muscleGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  muscleGroupBadge: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleGroupText: {
    fontSize: 14,
    color: colors.primary,
  },
  addButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  backButton: {
    alignSelf: "center",
  },
});
