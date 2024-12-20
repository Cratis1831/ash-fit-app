import { StyleSheet, Text, View, FlatList } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/utils/constants";

const Leaderboard = () => {
  const leaders = [
    { name: "Austin" },
    { name: "Aiden" },
    { name: "Nika" },
    { name: "Ashkan" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="crown" size={50} color="#FFD700" />
        <Text style={styles.headerText}>Leaderboard</Text>
      </View>
      <FlatList
        data={leaders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.name}>{item.name}</Text>
            {index == 0 && (
              <FontAwesome5
                name="crown"
                size={20}
                color="#FFD700"
                style={{ paddingLeft: 8 }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 4,
  },
  name: {
    fontSize: 20,
  },
});
