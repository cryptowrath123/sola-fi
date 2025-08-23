import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../lib/firebase";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = async () => {
    setShowSignOutModal(true);
  };

  const confirmSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setShowSignOutModal(false);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Sign out error:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Sign Out Modal */}
      <Modal
        visible={showSignOutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSignOutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.modalCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons
              name="log-out-outline"
              size={44}
              color="#ff6a6a"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.modalTitle}>Sign Out</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to sign out of Sola-Fi?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowSignOutModal(false)}
                disabled={loading}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.signOutButton]}
                onPress={confirmSignOut}
                disabled={loading}
              >
                <Text style={styles.signOutText}>
                  {loading ? "Signing Out..." : "Sign Out"}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>

      {/* Profile Card */}
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.profileCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileFrame}>
          <Text style={styles.profileLetter}>
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.profileTitle}>Account</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </LinearGradient>

      {/* Settings Groups */}
      <View style={styles.groupCard}>
        <Text style={styles.groupTitle}>Security</Text>
        <TouchableOpacity style={styles.groupItem}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#fff"
            style={styles.groupIcon}
          />
          <Text style={styles.groupText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupItem}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color="#fff"
            style={styles.groupIcon}
          />
          <Text style={styles.groupText}>Enable 2FA</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.groupCard}>
        <Text style={styles.groupTitle}>Preferences</Text>
        <TouchableOpacity style={styles.groupItem}>
          <Ionicons
            name="language-outline"
            size={20}
            color="#fff"
            style={styles.groupIcon}
          />
          <Text style={styles.groupText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupItem}>
          <Ionicons
            name="wallet-outline"
            size={20}
            color="#fff"
            style={styles.groupIcon}
          />
          <Text style={styles.groupText}>Import Solana Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
        disabled={loading}
      >
        <LinearGradient
          colors={loading ? ["#ccc", "#aaa"] : ["#ff6a6a", "#ff2d2d"]}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing Out..." : "Sign Out"}
          </Text>
          {!loading && (
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    backgroundColor: "#1e293b",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
    width: "90%",
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  profileFrame: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 2,
    borderColor: "#bae6fd",
    alignItems: "center",
    justifyContent: "center",
  },
  profileLetter: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: "#bae6fd",
    opacity: 0.8,
  },
  groupCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    width: "90%",
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 0,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  groupIcon: {
    marginRight: 12,
  },
  groupText: {
    fontSize: 15,
    color: "#e0e7ff",
    fontWeight: "500",
  },
  button: {
    borderRadius: 25,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#ff6a6a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: "90%",
    marginTop: 16,
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
  // Custom Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(30,41,59,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
    backgroundColor: "rgba(30,41,59,0.95)",
    shadowColor: "#764ba2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: 1.1,
  },
  modalMessage: {
    fontSize: 16,
    color: "#e0e7ff",
    textAlign: "center",
    marginBottom: 28,
    fontWeight: "500",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  signOutButton: {
    backgroundColor: "#ff6a6a",
    borderWidth: 0,
  },
  cancelText: {
    color: "#bae6fd",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
