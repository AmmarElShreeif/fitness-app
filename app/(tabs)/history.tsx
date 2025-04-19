import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { WorkoutCard } from "@/components/WorkoutCard";
import { useWorkoutStore } from "@/store/workout-store";
import { Calendar } from "lucide-react-native";

export default function HistoryScreen() {
  const { workoutHistory } = useWorkoutStore();

  // Group workouts by month
  const groupedWorkouts = React.useMemo(() => {
    const grouped: Record<string, typeof workoutHistory> = {};

    workoutHistory.forEach((workout) => {
      const date = new Date(workout.date);
      const monthYear = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push(workout);
    });

    // Sort each group by date (newest first)
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    return grouped;
  }, [workoutHistory]);

  // Convert grouped workouts to a format suitable for SectionList
  const sections = React.useMemo(() => {
    return Object.keys(groupedWorkouts)
      .sort((a, b) => {
        // Sort months in reverse chronological order
        const dateA = new Date(groupedWorkouts[a][0].date);
        const dateB = new Date(groupedWorkouts[b][0].date);
        return dateB.getTime() - dateA.getTime();
      })
      .map((title) => ({
        title,
        data: groupedWorkouts[title],
      }));
  }, [groupedWorkouts]);

  if (workoutHistory.length === 0) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={["bottom"]}
      >
        <View style={styles.emptyContainer}>
          <Calendar
            size={48}
            color={colors.textLight}
          />
          <Text style={styles.emptyTitle}>No workout history</Text>
          <Text style={styles.emptySubtitle}>Your completed workouts will appear here</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["bottom"]}
    >
      <FlatList
        data={workoutHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutCard
            workout={item}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => <Text style={styles.headerText}>Your Workout History</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    backgroundColor: colors.background,
    paddingVertical: 8,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
  },
});
