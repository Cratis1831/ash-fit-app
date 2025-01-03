import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
  title: string;
}

const CustomButton = ({
  onPress,
  accessibilityLabel,
  title,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      {...props}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={styles.buttonText}>{title || "Select an Option"}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Platform.select({ ios: "#f9f9f9", android: "#ccc" }),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
