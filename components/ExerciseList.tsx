import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Exercise } from "@/types/exercise";
import { ExerciseCard } from "./ExerciseCard";
import { colors } from "@/constants/colors";

interface ExerciseListProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  emptyMessage?: string;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onSelectExercise,
  emptyMessage = "No exercises found",
}) => {
  if (exercises.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExerciseCard
          exercise={item}
          onPress={onSelectExercise}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
  },
});
