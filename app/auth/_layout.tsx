import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
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
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </SafeAreaView>
  );
}
