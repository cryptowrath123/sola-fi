import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#7928CA", "#FF0080", "#F093FB"]}
        start={[0, 0]}
        end={[1, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>☀️</Text>
        </View>

        <Text style={styles.appName}>Sola‑Fi</Text>
        <Text style={styles.tagline}>Fast, simple Solana payments</Text>

        <View style={styles.features}>
          <Text style={styles.featureText}>💸 Pay</Text>
          <Text style={styles.featureText}>🔄 Swap</Text>
          <Text style={styles.featureText}>📈 Earn</Text>
        </View>

        <View style={styles.buttons}>
          <Link href="/auth/signup" asChild>
            <Pressable style={styles.primaryButton}>
              <LinearGradient
                colors={["#00d2ff", "#3a7bd5"]}
                style={styles.buttonGradient}
                start={[0, 0]}
                end={[1, 0]}
              >
                <Text style={styles.primaryButtonText}>Create Account</Text>
              </LinearGradient>
            </Pressable>
          </Link>

          <Link href="/auth/login" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>I already have an account</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={styles.footer}>Secure on Solana • Non‑custodial</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoEmoji: {
    fontSize: 72,
    textAlign: "center",
  },
  appName: {
    fontSize: 42,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  tagline: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "300",
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 50,
  },
  featureText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttons: {
    width: "100%",
    gap: 16,
  },
  primaryButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
  },
});
