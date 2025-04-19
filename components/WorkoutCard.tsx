import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Workout } from "@/types/exercise";
import { colors } from "@/constants/colors";
import { Calendar, Clock, Flame } from "lucide-react-native";

interface WorkoutCardProps {
  workout: Workout;
  onPress: (workout: Workout) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onPress }) => {
  const formattedDate = new Date(workout.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const exerciseCount = workout.exercises.length;

  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress(workout)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{workout.name}</Text>
        <View style={styles.dateContainer}>
          <Calendar
            size={14}
            color={colors.textLight}
          />
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Clock
            size={16}
            color={colors.primary}
          />
          <Text style={styles.statText}>{workout.duration} min</Text>
        </View>

        <View style={styles.statItem}>
          <Flame
            size={16}
            color={colors.secondary}
          />
          <Text style={styles.statText}>{workout.caloriesBurned} cal</Text>
        </View>

        <Text style={styles.exerciseCount}>
          {exerciseCount} exercise{exerciseCount !== 1 ? "s" : ""}
        </Text>
      </View>

      {workout.notes ? (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text
            style={styles.notes}
            numberOfLines={2}
          >
            {workout.notes}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 6,
  },
  exerciseCount: {
    fontSize: 14,
    color: colors.textLight,
  },
  notesContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: colors.textLight,
  },
});
