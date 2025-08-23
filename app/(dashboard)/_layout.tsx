import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f093fb" }}
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LinearGradient
        colors={["#667eea", "#764ba2", "#f093fb"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            borderTopWidth: 0,
            elevation: 0,
            height: 64,
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#bae6fd",
          tabBarLabelStyle: {
            fontWeight: "600",
            fontSize: 13,
            marginBottom: 8,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = "";
            if (route.name === "index")
              iconName = focused ? "wallet" : "wallet-outline";
            if (route.name === "buy")
              iconName = focused ? "card" : "card-outline";
            if (route.name === "pay")
              iconName = focused ? "qr-code" : "qr-code-outline";
            if (route.name === "settings")
              iconName = focused ? "settings" : "settings-outline";
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
        })}
      />
    </SafeAreaView>
  );
}
