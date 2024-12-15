import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/utils/constants";

interface ButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
  text: string;
}

const Button = ({ onPress, accessibilityLabel, text }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.startButton]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: Colors.COLORED_BUTTON_BACKGROUND,
  },
  buttonText: {
    color: Colors.COLORED_BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
});
