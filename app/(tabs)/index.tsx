import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { colors } from "@/constants/colors";
import { StatsCard, StatItem } from "@/components/StatsCard";
import { Button } from "@/components/Button";
import { WorkoutCard } from "@/components/WorkoutCard";
import { useWorkoutStore } from "@/store/workout-store";
import { getRecentWorkouts, getTotalStats } from "@/data/workouts";
import { Dumbbell, Flame, Clock, Calendar, Plus } from "lucide-react-native";

export default function DashboardScreen() {
  const { isWorkoutActive, currentWorkout } = useWorkoutStore();
  const recentWorkouts = getRecentWorkouts(3);
  const stats = getTotalStats();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["bottom"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Fitness Enthusiast!</Text>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>

        {isWorkoutActive && currentWorkout ? (
          <Link
            href="/workout"
            asChild
          >
            <View style={styles.activeWorkoutBanner}>
              <Text style={styles.activeWorkoutText}>Active Workout: {currentWorkout.name}</Text>
              <Text style={styles.activeWorkoutSubtext}>Tap to continue</Text>
            </View>
          </Link>
        ) : (
          <Link
            href="/workout/new"
            asChild
          >
            <Button
              title="Start New Workout"
              icon={
                <Plus
                  size={18}
                  color="white"
                />
              }
              style={styles.startButton}
              fullWidth
            />
          </Link>
        )}

        <StatsCard title="Your Stats">
          <StatItem
            label="Workouts"
            value={stats.totalWorkouts}
            icon={
              <Dumbbell
                size={20}
                color={colors.primary}
              />
            }
          />
          <StatItem
            label="Minutes"
            value={stats.totalDuration}
            icon={
              <Clock
                size={20}
                color={colors.primary}
              />
            }
          />
          <StatItem
            label="Calories"
            value={stats.totalCalories}
            icon={
              <Flame
                size={20}
                color={colors.primary}
              />
            }
          />
        </StatsCard>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <Link
            href="/history"
            asChild
          >
            <Text style={styles.seeAllLink}>See All</Text>
          </Link>
        </View>

        {recentWorkouts.length > 0 ? (
          recentWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={() => {}}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Calendar
              size={40}
              color={colors.textLight}
            />
            <Text style={styles.emptyStateText}>No workouts yet</Text>
            <Text style={styles.emptyStateSubtext}>Start tracking your fitness journey today</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  activeWorkoutBanner: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activeWorkoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  activeWorkoutSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  startButton: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  seeAllLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
  },
});
