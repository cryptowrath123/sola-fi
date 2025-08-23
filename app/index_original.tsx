import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  // start entrance animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 10000,
          easing: undefined,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim, rotateAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#7928CA", "#FF0080", "#F093FB"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradientBackground}
      />

      {/* subtle floating orbs */}
      <Animated.View
        style={[
          styles.orb,
          styles.orb1,
          { transform: [{ rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }] },
        ]}
      />
      <Animated.View style={[styles.orb, styles.orb2, { opacity: 0.9 }]} />
      <Animated.View style={[styles.orb, styles.orb3, { opacity: 0.8 }]} />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <Text style={styles.logoEmoji}>☀️</Text>
          </View>
        </View>

        <Text style={styles.appName}>Sola‑Fi</Text>
        <Text style={styles.tagline}>Fast, simple Solana payments</Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer} />
            <Text style={styles.featureText}>Pay</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer} />
            <Text style={styles.featureText}>Swap</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer} />
            <Text style={styles.featureText}>Earn</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            accessibilityLabel="Get started"
            style={styles.primaryButton}
            onPress={() => router.push("/auth/signup")}
          >
            <LinearGradient
              colors={["#00d2ff", "#3a7bd5"]}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Create account</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            accessibilityLabel="Log in"
            style={styles.secondaryButton}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </Pressable>
        </View>

        <Text style={styles.bottomText}>Secure on Solana · Non‑custodial</Text>
      </Animated.View>
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
  logoEmoji: {
    fontSize: 56,
    textAlign: "center",
    lineHeight: 120,
    color: "#fff",
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
