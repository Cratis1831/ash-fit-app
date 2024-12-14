import { IconSymbol } from "@/app-example/components/ui/IconSymbol.ios";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
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
            <IconSymbol size={28} name="person" color={"red"} />
          ),
        }}
      />

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="timer" color={"red"} />
          ),
        }}
      />

      {/* Workout Screen */}
      <Tabs.Screen
        name="index"
        options={{
          // title: "Home",
          tabBarLabel: "Workout",
          tabBarLabelStyle: {
            color: "red",
          },
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus" color={"red"} />
          ),
        }}
      />

      {/* Exercises */}
      <Tabs.Screen
        name="exercises"
        options={{
          tabBarLabel: "Exercises",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dumbbell" color={"red"} />
          ),
        }}
      />

      {/* Settings */}

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear" color={"red"} />
          ),
        }}
      />
    </Tabs>
  );
}
