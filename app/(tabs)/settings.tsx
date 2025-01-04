import { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { Colors } from "@/utils/constants";
import { Stack } from "expo-router";
import { RadioButton } from "react-native-paper";

const SettingsScreen = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setSoundEnabled] = useState(true);
  const [weightUnits, setWeightUnits] = useState("lbs");

  const appName = "AshFit";
  const appVersion = "1.0.0";

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.BACKGROUND_COLOR }]}
    >
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.BACKGROUND_COLOR,
          },
        }}
      />
      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={[styles.title, { color: Colors.ACTIVE_TAB_ICON }]}>
            Dark Mode
          </Text>
          <Text
            style={[styles.description, { color: Colors.INACTIVE_TAB_ICON }]}
          >
            Enable dark theme for better nighttime visibility.
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={setDarkMode}
          thumbColor={
            isDarkMode ? Colors.COLORED_BUTTON_TEXT : Colors.INACTIVE_TAB_ICON
          }
          trackColor={{
            false: Colors.INPUT_BORDER_COLOR,
            true: Colors.ACTIVE_TAB_ICON,
          }}
        />
      </View>

      {/* Notifications Toggle */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={[styles.title, { color: Colors.ACTIVE_TAB_ICON }]}>
            Notifications
          </Text>
          <Text
            style={[styles.description, { color: Colors.INACTIVE_TAB_ICON }]}
          >
            Receive alerts about updates and activity.
          </Text>
        </View>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={
            isNotificationsEnabled
              ? Colors.COLORED_BUTTON_TEXT
              : Colors.INACTIVE_TAB_ICON
          }
          trackColor={{
            false: Colors.INPUT_BORDER_COLOR,
            true: Colors.ACTIVE_TAB_ICON,
          }}
        />
      </View>

      {/* Sound Toggle */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={[styles.title, { color: Colors.ACTIVE_TAB_ICON }]}>
            Sound
          </Text>
          <Text
            style={[styles.description, { color: Colors.INACTIVE_TAB_ICON }]}
          >
            Enable sounds for notifications and feedback.
          </Text>
        </View>
        <Switch
          value={isSoundEnabled}
          onValueChange={setSoundEnabled}
          thumbColor={
            isSoundEnabled
              ? Colors.COLORED_BUTTON_TEXT
              : Colors.INACTIVE_TAB_ICON
          }
          trackColor={{
            false: Colors.INPUT_BORDER_COLOR,
            true: Colors.ACTIVE_TAB_ICON,
          }}
        />
      </View>

      {/* Weight Units Selection */}
      <View style={styles.settingRow}>
        <View style={styles.settingText}>
          <Text style={[styles.title, { color: Colors.ACTIVE_TAB_ICON }]}>
            Weight Units
          </Text>
          <Text
            style={[styles.description, { color: Colors.INACTIVE_TAB_ICON }]}
          >
            Choose your preferred unit for weight measurement.
          </Text>
        </View>

        <RadioButton.Group
          onValueChange={(value) => setWeightUnits(value)}
          value={weightUnits}
        >
          <View style={styles.radioRow}>
            <View>
              <Text
                style={[styles.radioLabel, { color: Colors.ACTIVE_TAB_ICON }]}
              >
                KGS
              </Text>
              <RadioButton
                value="kgs"
                color={Colors.ACTIVE_TAB_ICON}
                uncheckedColor={Colors.INACTIVE_TAB_ICON}
              />
            </View>
            <View>
              <Text
                style={[styles.radioLabel, { color: Colors.ACTIVE_TAB_ICON }]}
              >
                LBS
              </Text>
              <RadioButton
                value="lbs"
                color={Colors.ACTIVE_TAB_ICON}
                uncheckedColor={Colors.INACTIVE_TAB_ICON}
              />
            </View>
          </View>
        </RadioButton.Group>
      </View>

      {/* App Info at the Bottom */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: Colors.INACTIVE_TAB_ICON }]}>
          {appName}
        </Text>
        <Text style={[styles.footerText, { color: Colors.INACTIVE_TAB_ICON }]}>
          Version {appVersion}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  settingText: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: Colors.INACTIVE_TAB_ICON,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  footerText: {
    fontSize: 16,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioLabel: {
    fontSize: 16,
    // marginLeft: 8,
  },
});

export default SettingsScreen;
