import * as Crypto from "expo-crypto";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useWorkoutStore } from "@/utils/store";
import { Colors } from "@/utils/constants";
import Button from "@/components/Button";
import { Divider } from "react-native-paper";
import { useElapsedTime } from "@/hooks/useElapsedTime";

const HomeScreen = () => {
  const router = useRouter();
  const { workout, setWorkout } = useWorkoutStore();

  const handleGoToWorkout = () => {
    router.push("/create-workout");
    setWorkout({
      name: "",
      id: Crypto.randomUUID(),
      dateStarted: new Date(),
      note: null,
      exercises: [],
    });
  };

  const elapsedTime = useElapsedTime(
    workout.dateStarted?.toISOString() || null
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          // change background color of tab bar and header
          headerStyle: {
            backgroundColor: Colors.BACKGROUND_COLOR,
          },
        }}
      />
      <View style={styles.container}>
        {!workout.id && (
          <>
            <Button
              onPress={handleGoToWorkout}
              accessibilityLabel="Start a new workout"
              text="Start Workout"
            />
            <Divider style={{ marginVertical: 20 }} />
          </>
        )}
        <Text
          style={{
            color: Colors.DISABLED_BUTTON_TEXT,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Workout Templates
        </Text>
        {/* Horizontal FlatList of a container listing some dummy Workout Templates  */}
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={({ item }) => (
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: Colors.PRIMARY,
                borderColor: Colors.PRIMARY,
                borderWidth: 1,
                marginHorizontal: 5,
                borderRadius: 10,
                marginVertical: 10,
                justifyContent: "center",
              }}
            >
              {/* Put a random fitness ionicon in the center */}
              <Text style={{ textAlign: "center", fontSize: 80 }}>
                {/* random fitness icon based off of modulus  */}
                {item % 2 === 0 ? "🏋️" : "🚴"}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: Colors.COLORED_BUTTON_TEXT,
                }}
              >
                Template {item}
              </Text>
            </View>
          )}
        />
      </View>
      {workout.id && (
        <TouchableOpacity
          onPress={() => router.push("/create-workout")}
          style={styles.resumeButton}
          accessibilityLabel="Resume your workout"
          activeOpacity={0.8}
        >
          <Text style={styles.resumeText}>Resume Workout</Text>
          <Text style={styles.elapsedTime}>{elapsedTime}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Center vertically
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  resumeButton: {
    flexGrow: 1,
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 100,
    bottom: 75,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.COLORED_BUTTON_BACKGROUND,
    marginVertical: 10,
    marginRight: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  resumeText: {
    color: Colors.COLORED_BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
  elapsedTime: {
    color: Colors.COLORED_BUTTON_TEXT,
    fontSize: 14,
    fontWeight: "semibold",
  },
});

export default HomeScreen;
