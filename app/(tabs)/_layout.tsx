import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/utils/constants";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: Colors.BACKGROUND_COLOR,
            borderTopWidth: 0, // default is 1
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
          tabBarActiveTintColor: Colors.ACTIVE_TAB_ICON,
          tabBarInactiveTintColor: Colors.INACTIVE_TAB_ICON,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="person"
              color={
                focused ? Colors.ACTIVE_TAB_ICON : Colors.INACTIVE_TAB_ICON
              }
            />
          ),
        }}
      />

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "History",
          tabBarActiveTintColor: Colors.ACTIVE_TAB_ICON,
          tabBarInactiveTintColor: Colors.INACTIVE_TAB_ICON,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="timer"
              color={
                focused ? Colors.ACTIVE_TAB_ICON : Colors.INACTIVE_TAB_ICON
              }
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
          tabBarActiveTintColor: Colors.ACTIVE_TAB_ICON,
          tabBarInactiveTintColor: Colors.INACTIVE_TAB_ICON,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="plus"
              color={
                focused ? Colors.ACTIVE_TAB_ICON : Colors.INACTIVE_TAB_ICON
              }
            />
          ),
        }}
      />

      {/* Exercises */}
      <Tabs.Screen
        name="exercises"
        options={{
          tabBarLabel: "Exercises",
          tabBarActiveTintColor: Colors.ACTIVE_TAB_ICON,
          tabBarInactiveTintColor: Colors.INACTIVE_TAB_ICON,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="dumbbell"
              color={
                focused ? Colors.ACTIVE_TAB_ICON : Colors.INACTIVE_TAB_ICON
              }
            />
          ),
        }}
      />

      {/* Settings */}

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarActiveTintColor: Colors.ACTIVE_TAB_ICON,
          tabBarInactiveTintColor: Colors.INACTIVE_TAB_ICON,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="gear"
              color={
                focused ? Colors.ACTIVE_TAB_ICON : Colors.INACTIVE_TAB_ICON
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
