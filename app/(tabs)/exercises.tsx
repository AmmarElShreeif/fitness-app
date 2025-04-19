import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors } from "@/constants/colors";
import { ExerciseList } from "@/components/ExerciseList";
import { CategoryPill } from "@/components/CategoryPill";
import { exercises, categories } from "@/data/exercises";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Search, X } from "lucide-react-native";

export default function ExercisesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = useCallback(() => {
    let filtered = [...exercises];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((exercise) => exercise.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(query) ||
          exercise.description.toLowerCase().includes(query) ||
          exercise.muscleGroups.some((group) => group.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleSelectExercise = (exercise: Exercise) => {
    router.push(`/exercise/${exercise.id}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["bottom"]}
    >
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search
            size={20}
            color={colors.textLight}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textLight}
          />
          {searchQuery ? (
            <X
              size={20}
              color={colors.textLight}
              style={styles.clearIcon}
              onPress={clearSearch}
            />
          ) : null}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        <CategoryPill
          label="All"
          isSelected={selectedCategory === "all"}
          onPress={() => setSelectedCategory("all")}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            label={category.name}
            isSelected={selectedCategory === category.id}
            onPress={() => setSelectedCategory(category.id)}
          />
        ))}
      </ScrollView>

      <ExerciseList
        exercises={filteredExercises()}
        onSelectExercise={handleSelectExercise}
        emptyMessage={
          searchQuery ? "No exercises match your search" : "No exercises in this category"
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: colors.text,
    fontSize: 16,
  },
  clearIcon: {
    padding: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
