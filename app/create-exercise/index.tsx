import { useState } from "react";
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
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/utils/constants";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { bodyParts, exercises } from "@/db/schema";
import { Picker } from "@react-native-picker/picker";

const Page = () => {
  const router = useRouter();
  const [exerciseName, setExerciseName] = useState("");
  const [bodyPartName, setBodyPartName] = useState("");

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const query = drizzleDb.select().from(bodyParts).orderBy(bodyParts.name);

  const { data } = useLiveQuery(query);

  const saveExercise = async () => {
    if (!exerciseName.trim()) {
      Alert.alert("Error", "Exercise name cannot be empty.");
      return;
    }

    try {
      await drizzleDb.insert(exercises).values({
        name: exerciseName,
        bodyPart: bodyPartName,
      });

      // Reset input fields
      setExerciseName("");
      setBodyPartName("");

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
              <Ionicons
                name="chevron-down"
                size={24}
                color={Colors.PRIMARY_BUTTON_TEXT}
              />
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
            <Picker
              placeholder="Select Body Part"
              selectedValue={bodyPartName}
              onValueChange={(itemValue, itemIndex) =>
                setBodyPartName(itemValue)
              }
            >
              {data.map((item) => {
                return (
                  <Picker.Item
                    label={item.name!}
                    value={item.name}
                    key={item.id}
                    color={Colors.PRIMARY_BUTTON_TEXT}
                  />
                );
              })}
            </Picker>

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
    color: Colors.PRIMARY_BUTTON_TEXT,
  },
});
