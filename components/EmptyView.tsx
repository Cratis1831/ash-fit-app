import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type EmptyViewProps = {
  icon: keyof typeof Ionicons.glyphMap; // Restrict to Ionicons' valid icon names
  message: string; // Customizable text message
};

const EmptyView = ({ icon, message }: EmptyViewProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={100} color="#ccc" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#444",
    fontWeight: "500",
  },
});

export default EmptyView;
