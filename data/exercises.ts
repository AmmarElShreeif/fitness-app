import { Exercise, ExerciseCategory } from "@/types/exercise";

export const exercises: Exercise[] = [
  {
    id: "1",
    name: "Push-ups",
    category: "strength",
    muscleGroups: ["chest", "shoulders", "triceps"],
    difficulty: "beginner",
    description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Lower your body until your chest nearly touches the floor",
      "Push yourself back up to the starting position",
      "Keep your body in a straight line throughout the movement",
    ],
    caloriesPerMinute: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sets: 3,
    reps: 10,
  },
  {
    id: "2",
    name: "Squats",
    category: "strength",
    muscleGroups: ["legs", "core"],
    difficulty: "beginner",
    description:
      "A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower your body by bending your knees and pushing your hips back",
      "Keep your chest up and back straight",
      "Lower until thighs are parallel to the ground, then return to standing",
    ],
    caloriesPerMinute: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sets: 3,
    reps: 15,
  },
  {
    id: "3",
    name: "Running",
    category: "cardio",
    muscleGroups: ["legs", "cardio"],
    difficulty: "intermediate",
    description: "A high-impact cardio exercise that improves endurance and burns calories.",
    instructions: [
      "Start with a proper warm-up",
      "Maintain good posture with a slight forward lean",
      "Land midfoot and roll through to the toes",
      "Keep a consistent pace for your desired duration",
    ],
    caloriesPerMinute: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: 30,
    distance: 5,
  },
  {
    id: "4",
    name: "Plank",
    category: "strength",
    muscleGroups: ["core", "shoulders"],
    difficulty: "beginner",
    description: "An isometric core exercise that also engages the shoulders and back.",
    instructions: [
      "Start in a forearm plank position with elbows directly beneath shoulders",
      "Keep your body in a straight line from head to heels",
      "Engage your core and glutes",
      "Hold the position for the desired duration",
    ],
    caloriesPerMinute: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: 1,
  },
  {
    id: "5",
    name: "Pull-ups",
    category: "strength",
    muscleGroups: ["back", "biceps"],
    difficulty: "advanced",
    description: "An upper body compound exercise that primarily targets the back and biceps.",
    instructions: [
      "Hang from a pull-up bar with hands slightly wider than shoulder-width apart",
      "Pull your body up until your chin clears the bar",
      "Lower yourself back down with control",
      "Repeat for the desired number of repetitions",
    ],
    caloriesPerMinute: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sets: 3,
    reps: 8,
  },
  {
    id: "6",
    name: "Cycling",
    category: "cardio",
    muscleGroups: ["legs", "cardio"],
    difficulty: "intermediate",
    description:
      "A low-impact cardio exercise that strengthens the lower body and improves cardiovascular health.",
    instructions: [
      "Adjust the bike to fit your body properly",
      "Maintain a steady cadence",
      "Keep your core engaged and back straight",
      "Vary intensity for interval training",
    ],
    caloriesPerMinute: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: 45,
    distance: 15,
  },
  {
    id: "7",
    name: "Lunges",
    category: "strength",
    muscleGroups: ["legs"],
    difficulty: "intermediate",
    description:
      "A unilateral lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    instructions: [
      "Stand with feet hip-width apart",
      "Step forward with one leg and lower your body until both knees are bent at 90 degrees",
      "Push back up to the starting position",
      "Alternate legs for the desired number of repetitions",
    ],
    caloriesPerMinute: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sets: 3,
    reps: 12,
  },
  {
    id: "8",
    name: "Yoga Flow",
    category: "yoga",
    muscleGroups: ["fullBody", "core"],
    difficulty: "beginner",
    description: "A sequence of yoga poses that improve flexibility, balance, and mindfulness.",
    instructions: [
      "Begin with a few minutes of deep breathing",
      "Move through a sequence of poses, holding each for several breaths",
      "Focus on proper alignment and breathing",
      "End with a relaxation pose",
    ],
    caloriesPerMinute: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: 30,
  },
  {
    id: "9",
    name: "Burpees",
    category: "hiit",
    muscleGroups: ["fullBody", "cardio"],
    difficulty: "advanced",
    description: "A high-intensity full-body exercise that combines a squat, push-up, and jump.",
    instructions: [
      "Start in a standing position",
      "Drop into a squat position and place hands on the ground",
      "Kick feet back into a plank position and perform a push-up",
      "Return feet to squat position and jump up explosively",
    ],
    caloriesPerMinute: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sets: 3,
    reps: 10,
  },
  {
    id: "10",
    name: "Dumbbell Rows",
    category: "strength",
    muscleGroups: ["back", "biceps"],
    difficulty: "intermediate",
    description: "A unilateral back exercise that targets the latissimus dorsi and rhomboids.",
    instructions: [
      "Place one knee and hand on a bench, keeping your back flat",
      "Hold a dumbbell in your free hand, arm extended",
      "Pull the dumbbell up to your hip, keeping your elbow close to your body",
      "Lower the dumbbell with control and repeat",
    ],
    caloriesPerMinute: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sets: 3,
    reps: 12,
  },
  {
    id: "11",
    name: "Jump Rope",
    category: "cardio",
    muscleGroups: ["legs", "cardio"],
    difficulty: "beginner",
    description:
      "A simple but effective cardio exercise that improves coordination and burns calories.",
    instructions: [
      "Hold the handles with a firm grip and position the rope behind you",
      "Swing the rope over your head and jump as it approaches your feet",
      "Keep your jumps small and stay on the balls of your feet",
      "Maintain a consistent rhythm",
    ],
    caloriesPerMinute: 11,
    imageUrl:
      "https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: 15,
  },
  {
    id: "12",
    name: "Deadlifts",
    category: "strength",
    muscleGroups: ["back", "legs"],
    difficulty: "advanced",
    description:
      "A compound strength exercise that targets multiple muscle groups, particularly the posterior chain.",
    instructions: [
      "Stand with feet hip-width apart, barbell over midfoot",
      "Bend at the hips and knees to grip the bar with hands shoulder-width apart",
      "Lift the bar by extending hips and knees, keeping back straight",
      "Return the bar to the ground with control",
    ],
    caloriesPerMinute: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    sets: 3,
    reps: 8,
  },
];

export const getExercisesByCategory = (category: ExerciseCategory): Exercise[] => {
  return exercises.filter((exercise) => exercise.category === category);
};

export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return exercises.filter((exercise) => exercise.muscleGroups.includes(muscleGroup as any));
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find((exercise) => exercise.id === id);
};

export const categories: { id: ExerciseCategory; name: string; icon: string }[] = [
  { id: "strength", name: "Strength", icon: "dumbbell" },
  { id: "cardio", name: "Cardio", icon: "heart" },
  { id: "flexibility", name: "Flexibility", icon: "move" },
  { id: "hiit", name: "HIIT", icon: "zap" },
  { id: "yoga", name: "Yoga", icon: "feather" },
  { id: "calisthenics", name: "Calisthenics", icon: "user" },
];
