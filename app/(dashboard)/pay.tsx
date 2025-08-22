import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PayScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("SOL");
  const [sendToEmail, setSendToEmail] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const cryptoOptions = [
    { symbol: "SOL", name: "Solana", icon: "diamond-outline" },
    { symbol: "BTC", name: "Bitcoin", icon: "logo-bitcoin" },
    { symbol: "ETH", name: "Ethereum", icon: "triangle-outline" },
    { symbol: "USDC", name: "USD Coin", icon: "ellipse-outline" },
  ];

  const handleSendPayment = () => {
    const recipient = sendToEmail ? recipientEmail : walletAddress;
    if (!recipient || !amount) {
      Alert.alert(
        "Error",
        sendToEmail
          ? "Please enter email and amount"
          : "Please enter wallet address and amount"
      );
      return;
    }

    if (sendToEmail && !isValidEmail(recipientEmail)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    const recipientDisplay = sendToEmail
      ? recipientEmail
      : `${walletAddress.slice(0, 8)}...`;

    Alert.alert(
      "Confirm Payment",
      `Send ${amount} ${selectedCrypto} to ${recipientDisplay}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          style: "default",
          onPress: () => {
            if (sendToEmail) {
              // Simulate checking if email is registered
              setTimeout(() => {
                Alert.alert("Success", `Payment sent to ${recipientEmail}!`);
              }, 1000);
            } else {
              Alert.alert("Success", "Payment sent!");
            }
          },
        },
      ]
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStartScanning = () => {
    if (sendToEmail) {
      Alert.alert("Info", "QR scanning is only available for wallet addresses");
      return;
    }
    setIsScanning(true);
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      setWalletAddress("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM");
      setIsScanning(false);
      Alert.alert("QR Code Scanned", "Wallet address detected!");
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Send Payment</Text>
        <Text style={styles.subtitle}>
          Scan QR code or enter wallet address
        </Text>
      </View>

      {/* QR Scanner Section */}
      <View style={styles.scannerSection}>
        <LinearGradient
          colors={["rgba(79, 172, 254, 0.2)", "rgba(0, 242, 254, 0.1)"]}
          style={styles.scannerCard}
        >
          {isScanning ? (
            <View style={styles.scanningView}>
              <View style={styles.scannerFrame}>
                <View style={styles.scannerCorner} />
                <View style={[styles.scannerCorner, styles.topRight]} />
                <View style={[styles.scannerCorner, styles.bottomLeft]} />
                <View style={[styles.scannerCorner, styles.bottomRight]} />
              </View>
              <Text style={styles.scanningText}>Scanning QR Code...</Text>
            </View>
          ) : (
            <View style={styles.scanPrompt}>
              <Ionicons name="qr-code-outline" size={64} color="#4facfe" />
              <Text style={styles.scanTitle}>Scan QR Code</Text>
              <Text style={styles.scanSubtitle}>
                Point your camera at a wallet QR code
              </Text>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleStartScanning}
              >
                <LinearGradient
                  colors={["#4facfe", "#00f2fe"]}
                  style={styles.scanButtonGradient}
                >
                  <Ionicons name="camera" size={20} color="#fff" />
                  <Text style={styles.scanButtonText}>Start Scanning</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </View>

      {/* Manual Entry Section */}
      <View style={styles.manualSection}>
        <Text style={styles.sectionTitle}>Or Enter Manually</Text>

        {/* Crypto Selection */}
        <View style={styles.cryptoSelector}>
          {cryptoOptions.map((crypto) => (
            <TouchableOpacity
              key={crypto.symbol}
              style={[
                styles.cryptoOption,
                selectedCrypto === crypto.symbol && styles.selectedCryptoOption,
              ]}
              onPress={() => setSelectedCrypto(crypto.symbol)}
            >
              <Ionicons
                name={crypto.icon as any}
                size={20}
                color={selectedCrypto === crypto.symbol ? "#4facfe" : "#bae6fd"}
              />
              <Text
                style={[
                  styles.cryptoOptionText,
                  selectedCrypto === crypto.symbol && styles.selectedCryptoText,
                ]}
              >
                {crypto.symbol}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wallet Address Input */}
        <View style={styles.inputGroup}>
          <View style={styles.recipientToggle}>
            <Text style={styles.inputLabel}>Send To</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  !sendToEmail && styles.activeToggle,
                ]}
                onPress={() => {
                  setSendToEmail(false);
                  setRecipientEmail("");
                }}
              >
                <Text
                  style={[
                    styles.toggleText,
                    !sendToEmail && styles.activeToggleText,
                  ]}
                >
                  Wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  sendToEmail && styles.activeToggle,
                ]}
                onPress={() => {
                  setSendToEmail(true);
                  setWalletAddress("");
                }}
              >
                <Text
                  style={[
                    styles.toggleText,
                    sendToEmail && styles.activeToggleText,
                  ]}
                >
                  Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {sendToEmail ? (
            <TextInput
              style={styles.addressInput}
              placeholder="Enter registered email address"
              placeholderTextColor="#bae6fd"
              value={recipientEmail}
              onChangeText={setRecipientEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <TextInput
              style={styles.addressInput}
              placeholder="Enter wallet address"
              placeholderTextColor="#bae6fd"
              value={walletAddress}
              onChangeText={setWalletAddress}
              multiline
            />
          )}
        </View>

        {/* Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Amount</Text>
          <View style={styles.amountInputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#bae6fd"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <Text style={styles.currencyLabel}>{selectedCrypto}</Text>
          </View>
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendPayment}>
          <LinearGradient
            colors={["#4facfe", "#00f2fe"]}
            style={styles.sendButtonGradient}
          >
            <Text style={styles.sendButtonText}>Send Payment</Text>
            <Ionicons name="send" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e7ff",
    opacity: 0.8,
  },
  scannerSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  scannerCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    minHeight: 200,
    justifyContent: "center",
  },
  scanningView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scannerFrame: {
    width: 150,
    height: 150,
    position: "relative",
    marginBottom: 16,
  },
  scannerCorner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#4facfe",
    borderWidth: 3,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    transform: [{ rotate: "90deg" }],
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    transform: [{ rotate: "-90deg" }],
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    transform: [{ rotate: "180deg" }],
  },
  scanningText: {
    color: "#4facfe",
    fontSize: 16,
    fontWeight: "600",
  },
  scanPrompt: {
    alignItems: "center",
  },
  scanTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 16,
    marginBottom: 8,
  },
  scanSubtitle: {
    fontSize: 14,
    color: "#e0e7ff",
    textAlign: "center",
    marginBottom: 20,
  },
  scanButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  scanButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  manualSection: {
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  cryptoSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  cryptoOption: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  selectedCryptoOption: {
    borderColor: "#4facfe",
    backgroundColor: "rgba(79, 172, 254, 0.1)",
  },
  cryptoOptionText: {
    color: "#bae6fd",
    fontWeight: "600",
    marginTop: 4,
    fontSize: 12,
  },
  selectedCryptoText: {
    color: "#4facfe",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#e0e7ff",
    marginBottom: 8,
    fontWeight: "600",
  },
  addressInput: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 16,
    color: "#fff",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    textAlignVertical: "top",
    minHeight: 60,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  amountInput: {
    flex: 1,
    padding: 16,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  currencyLabel: {
    color: "#4facfe",
    fontWeight: "700",
    paddingRight: 16,
    fontSize: 16,
  },
  recipientToggle: {
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#4facfe",
  },
  toggleText: {
    color: "#bae6fd",
    fontWeight: "600",
    fontSize: 14,
  },
  activeToggleText: {
    color: "#fff",
  },
  sendButton: {
    borderRadius: 25,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#4facfe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginTop: 20,
  },
  sendButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
  bottomPadding: {
    height: 20,
  },
});
