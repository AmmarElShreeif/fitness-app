import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => {
  return (
    <View style={styles.statItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
};

interface StatsCardProps {
  title?: string;
  children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.statsContainer}>{children}</View>
    </View>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
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
});
