import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabaseAuth } from "../../services/supabaseAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await supabaseAuth.loginWithEmail(email, password);
      if (!result.session) throw new Error('Login failed');
      router.replace("/(dashboard)" as any);
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Ionicons
          name="log-in"
          size={48}
          color="#fff"
          style={styles.iconShadow}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your Sola-Fi account</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#e0e7ff"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor="#e0e7ff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#bae6fd"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotLink}
          onPress={() => router.push("/auth/forgot-password")}
        >
          <Text style={styles.forgotLinkText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <LinearGradient
            colors={loading ? ["#ccc", "#aaa"] : ["#4facfe", "#00f2fe"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging In..." : "Log In"}
            </Text>
            {!loading && (
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/auth/signup")}
      >
        <Text style={styles.linkText}>Don&apos;t have an account? Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconShadow: {
    textShadowColor: "#764ba2",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginTop: 12,
    letterSpacing: 1.5,
  },
  subtitle: {
    color: "#e0e7ff",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    marginBottom: 16,
    paddingRight: 8,
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    borderRadius: 25,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#4facfe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: "#bae6fd",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  forgotLinkText: {
    color: "#bae6fd",
    fontSize: 14,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
