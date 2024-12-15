import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { Colors } from "@/utils/constants";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="person"
              color={Colors.PRIMARY_BUTTON_TEXT}
            />
          ),
        }}
      />

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "History",
          tabBarActiveTintColor: Colors.PRIMARY_BUTTON_TEXT,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="timer"
              color={Colors.PRIMARY_BUTTON_TEXT}
            />
          ),
        }}
      />

      {/* Workout Screen */}
      <Tabs.Screen
        name="index"
        options={{
          // title: "Home",
          tabBarLabel: "Workout",
          tabBarActiveTintColor: Colors.PRIMARY_BUTTON_TEXT,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="plus"
              color={Colors.PRIMARY_BUTTON_TEXT}
            />
          ),
        }}
      />

      {/* Exercises */}
      <Tabs.Screen
        name="exercises"
        options={{
          tabBarLabel: "Exercises",
          tabBarActiveTintColor: Colors.PRIMARY_BUTTON_TEXT,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="dumbbell"
              color={Colors.PRIMARY_BUTTON_TEXT}
            />
          ),
        }}
      />

      {/* Settings */}

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarActiveTintColor: Colors.PRIMARY_BUTTON_TEXT,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="gear"
              color={Colors.PRIMARY_BUTTON_TEXT}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
