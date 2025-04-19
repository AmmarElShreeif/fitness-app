import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

interface CategoryPillProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ label, isSelected, onPress }) => {
  return (
    <Pressable
      style={[styles.container, isSelected ? styles.selectedContainer : null]}
      onPress={onPress}
    >
      <Text style={[styles.label, isSelected ? styles.selectedLabel : null]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  selectedLabel: {
    color: "white",
  },
});
