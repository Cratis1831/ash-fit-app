import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { exercises } from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { Colors } from "@/utils/constants";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useState } from "react";
import EmptyView from "@/components/EmptyView";

const Page = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const query = drizzleDb.select().from(exercises).orderBy(exercises.name);

  const { data } = useLiveQuery(query);

  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const translateX = useSharedValue(-50); // Start hidden above view

  // Toggle visibility
  const toggleSearchBar = () => {
    setIsVisible(!isVisible);
    translateX.value = isVisible ? 50 : 0; // Slide down/up
  };

  // Animated style for the TextInput
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   { translateX: withTiming(translateX.value, { duration: 300 }) },
      // ],
      opacity: withTiming(isVisible ? 1 : 0, { duration: 300 }),
      width: withTiming(isVisible ? 250 : 0, { duration: 300 }),
    };
  });
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
          headerTitle: () => (
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Animated.View style={[animatedStyle, styles.inputContainer]}>
                <TextInput
                  placeholder="Search Exercises"
                  placeholderTextColor={Colors.INACTIVE_TAB_ICON}
                  style={styles.textInput}
                  onBlur={toggleSearchBar}
                />
              </Animated.View>
            </View>
          ),
          headerLeft: () => null,
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 16, gap: 16 }}>
              <TouchableOpacity onPress={toggleSearchBar}>
                <Ionicons name="search" size={28} color={Colors.PRIMARY} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/create-exercise")}
                accessibilityLabel="Add a New Exercise"
              >
                <Ionicons name="add" size={28} color={Colors.PRIMARY} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <EmptyView
              icon="information-circle-outline"
              message="No exercises found"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/exercise-detail/${item.id}`)}
            >
              <View style={styles.itemContainer}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{item.name?.charAt(0)}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <Text style={styles.bodyPart}>{item.bodyPart}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Center vertically
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    marginVertical: 8,
    backgroundColor: Colors.BACKGROUND_COLOR,
    borderRadius: 8,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.BACKGROUND_COLOR,
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    // color: Colors.,
  },
  bodyPart: {
    fontSize: 14,
    color: Colors.COLORED_BUTTON_BACKGROUND,
  },
  inputContainer: {
    flexGrow: 1, // Allow the input to take up remaining space
    flexShrink: 1, // Shrink when needed
    marginLeft: -30,
    marginRight: 10,
  },
  textInput: {
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
