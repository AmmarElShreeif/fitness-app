import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { Play, Pause, Square } from "lucide-react-native";

interface WorkoutTimerProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  startTime: Date | null;
}

export const WorkoutTimer: React.FC<WorkoutTimerProps> = ({
  isActive,
  onToggle,
  onReset,
  startTime,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
      <View style={styles.controls}>
        <Pressable
          style={[styles.button, styles.toggleButton]}
          onPress={onToggle}
        >
          {isActive ? (
            <Pause
              size={24}
              color="white"
            />
          ) : (
            <Play
              size={24}
              color="white"
            />
          )}
        </Pressable>
        <Pressable
          style={[styles.button, styles.resetButton]}
          onPress={onReset}
        >
          <Square
            size={24}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
    fontVariant: ["tabular-nums"],
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  toggleButton: {
    backgroundColor: colors.primary,
  },
  resetButton: {
    backgroundColor: colors.error,
  },
});
