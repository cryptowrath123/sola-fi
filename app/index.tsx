import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for the crypto icon
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeAnim, rotateAnim, scaleAnim, slideAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Animated Background Gradient */}
      <LinearGradient
        colors={["#667eea", "#764ba2", "#f093fb"]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating Orbs */}
      <Animated.View style={[styles.orb, styles.orb1, { opacity: fadeAnim }]} />
      <Animated.View style={[styles.orb, styles.orb2, { opacity: fadeAnim }]} />
      <Animated.View style={[styles.orb, styles.orb3, { opacity: fadeAnim }]} />

      {/* Main Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo/Icon Container */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.iconBackground,
              { transform: [{ rotate: rotation }] },
            ]}
          >
            <BlurView intensity={20} style={styles.blurContainer}>
              <Ionicons name="diamond" size={60} color="#fff" />
            </BlurView>
          </Animated.View>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>Sola-Fi</Text>
        <Text style={styles.tagline}>Your Gateway to DeFi</Text>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="shield-checkmark" size={24} color="#4ade80" />
            </View>
            <Text style={styles.featureText}>Secure Wallet</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="trending-up" size={24} color="#f59e0b" />
            </View>
            <Text style={styles.featureText}>DeFi Trading</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="flash" size={24} color="#ef4444" />
            </View>
            <Text style={styles.featureText}>Instant Swaps</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/auth/signup")}
          >
            <LinearGradient
              colors={["#4facfe", "#00f2fe"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.secondaryButtonText}>Jump back in</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Info */}
        <Text style={styles.bottomText}>
          Powered by cutting-edge blockchain technology
        </Text>
      </Animated.View>

      {/* Floating Action Indicators */}
      <View style={styles.floatingIndicators}>
        <View style={styles.indicator} />
        <View style={[styles.indicator, styles.activeIndicator]} />
        <View style={styles.indicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f093fb", // Match the end color of the gradient
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  orb: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  orb1: {
    width: 200,
    height: 200,
    top: -100,
    right: -100,
  },
  orb2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -75,
    backgroundColor: "rgba(79, 172, 254, 0.2)",
  },
  orb3: {
    width: 120,
    height: 120,
    top: height * 0.3,
    right: -60,
    backgroundColor: "rgba(245, 158, 11, 0.15)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  logoContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
  },
  blurContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "300",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 60,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  featureText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 8,
    shadowColor: "#4facfe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  secondaryButton: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  bottomText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    textAlign: "center",
    fontStyle: "italic",
  },
  floatingIndicators: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#fff",
    width: 24,
  },
});
