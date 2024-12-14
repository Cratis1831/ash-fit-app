import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useWorkoutStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const router = useRouter();
  const { workout, setWorkout, clearWorkout } = useWorkoutStore();
  const [workoutName, setWorkoutName] = useState<string>(workout.name || "");

  const saveWorkout = () => {
    setWorkout({ ...workout, name: workoutName, id: "123" });
    console.log(workout);
  };

  const showAlert = () => {
    Alert.alert("Coming soon!", "", [{ text: "OK", style: "cancel" }]);
  };

  const cancelWorkout = () => {
    clearWorkout();
    router.dismiss();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View style={styles.toolbarContainer}>
              <TouchableOpacity
                onPress={() => router.dismiss()}
                style={styles.toolbarButton}
              >
                <Text style={styles.toolbarIcon}>
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    style={{ fontWeight: "bold" }}
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showAlert}
                style={styles.toolbarButton}
              >
                <Text style={styles.toolbarIcon}>
                  <Ionicons
                    name="timer-outline"
                    size={24}
                    style={{ fontWeight: "bold" }}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={saveWorkout} style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter workout name..."
          value={workoutName}
          onChangeText={setWorkoutName}
        />

        <View style={{ flex: 1 }}>
          {workout.dateStarted && (
            <>
              <Text>Workout ID: {workout.id}</Text>
              <Text>Workout Name: {workout.name}</Text>
              <Text>
                Workout Start Time: {workout.dateStarted?.toISOString()}
              </Text>
              <Text>Workout Note: {workout.note}</Text>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
                onPress={cancelWorkout}
              >
                <Text style={{ color: "red" }}>Cancel Workout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toolbarButton: {
    marginHorizontal: 8,
  },
  toolbarIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  saveButton: {
    marginHorizontal: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
