import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/utils/constants";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { bodyParts, exercises } from "@/db/schema";
import { Picker } from "@react-native-picker/picker";
import { useBodyPartStore } from "@/store";

const Page = () => {
  const router = useRouter();
  const { selectedBodyPart } = useLocalSearchParams(); // Get the query parameter
  const [exerciseName, setExerciseName] = useState("");
  const { bodyPart, setBodyPart } = useBodyPartStore();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const query = drizzleDb.select().from(bodyParts).orderBy(bodyParts.name);

  const { data } = useLiveQuery(query);

  const saveExercise = async () => {
    if (!exerciseName.trim() || !bodyPart) {
      Alert.alert("Error", "Exercise name and body part are both required.");
      return;
    }

    try {
      await drizzleDb.insert(exercises).values({
        name: exerciseName,
        bodyPart: bodyPart,
      });

      // Reset input fields
      setExerciseName("");
      setBodyPart("");

      Alert.alert("Exercise Added", "Completed!");
      router.dismiss();
    } catch (error) {
      console.error("Error saving exercise:", error);
      Alert.alert("Error", "Failed to save the exercise.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.dismiss()}
              style={styles.toolbarButton}
              accessibilityLabel="Close"
            >
              <Ionicons name="chevron-down" size={24} color={Colors.PRIMARY} />
            </TouchableOpacity>
          ),
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter exercise name..."
              placeholderTextColor={Colors.INACTIVE_TAB_ICON}
              value={exerciseName}
              onChangeText={setExerciseName}
              keyboardType="default"
              accessibilityLabel="Exercise Name Input"
            />
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => router.push("/create-exercise/select-bodypart")}
            >
              <Text
                style={bodyPart ? styles.placeholderText : styles.selectedText}
              >
                {bodyPart || "Select a bodypart"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={saveExercise}>
              <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.INPUT_BORDER_COLOR,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  button: {
    backgroundColor: Colors.COLORED_BUTTON_BACKGROUND,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.COLORED_BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
  toolbarButton: {
    marginHorizontal: 8,
  },
  saveButton: {
    marginHorizontal: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },

  selectButton: {
    backgroundColor: "#fff", // White background for the button
    borderColor: "#ccc", // Light gray border for clarity
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    paddingVertical: 12, // Padding for height
    paddingHorizontal: 16, // Padding for content spacing
    marginVertical: 8, // Spacing between other components
    alignItems: "center", // Center the text horizontally
    justifyContent: "center", // Center the text vertically
  },
  placeholderText: {
    color: "#888", // Light gray to indicate placeholder
    fontSize: 16, // Medium font size
    fontStyle: "italic", // Italic style to differentiate placeholder
  },
  selectedText: {
    color: "#000", // Black for selected value
    fontSize: 16, // Consistent font size
    fontWeight: "bold", // Bold text to emphasize the selection
  },
});
