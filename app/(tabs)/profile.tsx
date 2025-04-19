import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { Button } from "@/components/Button";
import { useWorkoutStore } from "@/store/workout-store";
import { getTotalStats } from "@/data/workouts";
import { User, Award, Flame, Clock, Dumbbell, Trash2 } from "lucide-react-native";

export default function ProfileScreen() {
  const { workoutHistory, clearCurrentWorkout } = useWorkoutStore();
  const stats = getTotalStats();

  const confirmReset = () => {
    Alert.alert(
      "Reset Workout Data",
      "Are you sure you want to reset your current workout? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: clearCurrentWorkout },
      ]
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["bottom"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User
              size={40}
              color={colors.primary}
            />
          </View>
          <Text style={styles.profileName}>Fitness Enthusiast</Text>
          <Text style={styles.profileSubtitle}>Keep pushing your limits!</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Dumbbell
                size={20}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Clock
                size={20}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={styles.statValue}>{stats.totalDuration}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Flame
                size={20}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={styles.statValue}>{stats.totalCalories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            <View style={styles.achievementItem}>
              <Award
                size={24}
                color={workoutHistory.length >= 1 ? colors.primary : colors.inactive}
              />
              <Text style={styles.achievementTitle}>First Workout</Text>
              <Text style={styles.achievementDesc}>Complete your first workout</Text>
            </View>

            <View style={styles.achievementItem}>
              <Award
                size={24}
                color={workoutHistory.length >= 5 ? colors.primary : colors.inactive}
              />
              <Text style={styles.achievementTitle}>Getting Started</Text>
              <Text style={styles.achievementDesc}>Complete 5 workouts</Text>
            </View>

            <View style={styles.achievementItem}>
              <Award
                size={24}
                color={workoutHistory.length >= 10 ? colors.primary : colors.inactive}
              />
              <Text style={styles.achievementTitle}>Consistency</Text>
              <Text style={styles.achievementDesc}>Complete 10 workouts</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            <Button
              title="Reset Current Workout"
              variant="outline"
              icon={
                <Trash2
                  size={16}
                  color={colors.primary}
                />
              }
              onPress={confirmReset}
              fullWidth
            />
          </View>
        </View>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.highlight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  achievementsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  achievementDesc: {
    fontSize: 12,
    color: colors.textLight,
    flex: 1,
  },
  settingsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
