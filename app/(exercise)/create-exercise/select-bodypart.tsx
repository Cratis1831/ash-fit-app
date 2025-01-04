import { bodyParts } from "@/db/schema";
import { useBodyPartStore } from "@/utils/store";
import { Colors } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";

const SelectBodyPart = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const { bodyPart, setBodyPart } = useBodyPartStore();
  const query = drizzleDb.select().from(bodyParts).orderBy(bodyParts.name);

  const { data } = useLiveQuery(query);

  const selectBodyPart = (bodyPart: string) => {
    setBodyPart(bodyPart);
    router.dismiss();
  };

  // Get window height to adjust modal space
  const { height } = useWindowDimensions();

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
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectBodyPart(item.name!)}>
            <View style={styles.itemContainer}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{item.name?.charAt(0)}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.bodyPartName}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default SelectBodyPart;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  bodyPartName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  toolbarButton: {
    marginHorizontal: 8,
  },
});
