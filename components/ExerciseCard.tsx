import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Exercise } from "@/types/exercise";
import { colors } from "@/constants/colors";
import { Dumbbell, Clock, Zap } from "lucide-react-native";

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: (exercise: Exercise) => void;
  compact?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onPress,
  compact = false,
}) => {
  const handlePress = () => {
    onPress(exercise);
  };

  if (compact) {
    return (
      <Pressable
        style={styles.compactContainer}
        onPress={handlePress}
      >
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle}>{exercise.name}</Text>
          <View style={styles.compactMeta}>
            {exercise.sets && exercise.reps ? (
              <Text style={styles.compactMetaText}>
                {exercise.sets} × {exercise.reps}
              </Text>
            ) : exercise.duration ? (
              <Text style={styles.compactMetaText}>{exercise.duration} min</Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
    >
      <Image
        source={{ uri: exercise.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{exercise.name}</Text>
        <Text style={styles.category}>
          {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
        </Text>

        <View style={styles.metaContainer}>
          {exercise.sets && exercise.reps ? (
            <View style={styles.metaItem}>
              <Dumbbell
                size={16}
                color={colors.primary}
              />
              <Text style={styles.metaText}>
                {exercise.sets} sets × {exercise.reps} reps
              </Text>
            </View>
          ) : null}

          {exercise.duration ? (
            <View style={styles.metaItem}>
              <Clock
                size={16}
                color={colors.primary}
              />
              <Text style={styles.metaText}>{exercise.duration} min</Text>
            </View>
          ) : null}

          <View style={styles.metaItem}>
            <Zap
              size={16}
              color={colors.primary}
            />
            <Text style={styles.metaText}>{exercise.caloriesPerMinute} cal/min</Text>
          </View>
        </View>

        <View style={[styles.difficultyBadge, getDifficultyStyle(exercise.difficulty)]}>
          <Text style={styles.difficultyText}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return { backgroundColor: colors.success };
    case "intermediate":
      return { backgroundColor: colors.warning };
    case "advanced":
      return { backgroundColor: colors.error };
    default:
      return { backgroundColor: colors.success };
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  metaContainer: {
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  difficultyBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  compactContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  compactContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  compactMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  compactMetaText: {
    fontSize: 14,
    color: colors.textLight,
  },
});
