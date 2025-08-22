import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BuyScreen() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("card");

  const cryptoOptions = [
    { symbol: "BTC", name: "Bitcoin", price: "$50,847", change: "+2.45%" },
    { symbol: "ETH", name: "Ethereum", price: "$2,493", change: "-1.23%" },
    { symbol: "SOL", name: "Solana", price: "$47.08", change: "+5.67%" },
    { symbol: "USDC", name: "USD Coin", price: "$1.00", change: "0.00%" },
  ];

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "card-outline",
      fee: "2.9%",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "business-outline",
      fee: "0.5%",
    },
    { id: "apple", name: "Apple Pay", icon: "logo-apple", fee: "2.9%" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Buy Crypto</Text>
        <Text style={styles.subtitle}>
          Purchase your favorite cryptocurrencies
        </Text>
      </View>

      {/* Amount Input Card */}
      <View style={styles.amountCard}>
        <LinearGradient
          colors={["rgba(79, 172, 254, 0.2)", "rgba(0, 242, 254, 0.1)"]}
          style={styles.amountGradient}
        >
          <Text style={styles.amountLabel}>Amount (USD)</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#bae6fd"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <View style={styles.quickAmounts}>
            {["$100", "$500", "$1000"].map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                style={styles.quickAmountButton}
                onPress={() => setAmount(quickAmount.slice(1))}
              >
                <Text style={styles.quickAmountText}>{quickAmount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Crypto Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Cryptocurrency</Text>
        {cryptoOptions.map((crypto) => (
          <TouchableOpacity
            key={crypto.symbol}
            style={[
              styles.cryptoCard,
              selectedCrypto === crypto.symbol && styles.selectedCrypto,
            ]}
            onPress={() => setSelectedCrypto(crypto.symbol)}
          >
            <View style={styles.cryptoInfo}>
              <View style={styles.cryptoIcon}>
                <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
              </View>
              <View style={styles.cryptoDetails}>
                <Text style={styles.cryptoName}>{crypto.name}</Text>
                <Text style={styles.cryptoPrice}>{crypto.price}</Text>
              </View>
            </View>
            <View style={styles.cryptoRight}>
              <Text
                style={[
                  styles.cryptoChange,
                  {
                    color: crypto.change.startsWith("+")
                      ? "#4ade80"
                      : crypto.change.startsWith("-")
                        ? "#f87171"
                        : "#94a3b8",
                  },
                ]}
              >
                {crypto.change}
              </Text>
              {selectedCrypto === crypto.symbol && (
                <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentCard,
              selectedPayment === method.id && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <View style={styles.paymentInfo}>
              <Ionicons name={method.icon as any} size={24} color="#fff" />
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentName}>{method.name}</Text>
                <Text style={styles.paymentFee}>Fee: {method.fee}</Text>
              </View>
            </View>
            {selectedPayment === method.id && (
              <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Buy Button */}
      <TouchableOpacity style={styles.buyButton}>
        <LinearGradient
          colors={["#4facfe", "#00f2fe"]}
          style={styles.buyGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buyText}>
            Buy {selectedCrypto} • ${amount || "0.00"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

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
  amountCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
  },
  amountGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  amountLabel: {
    fontSize: 14,
    color: "#e0e7ff",
    marginBottom: 12,
    fontWeight: "600",
  },
  amountInput: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  quickAmounts: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  quickAmountButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  quickAmountText: {
    color: "#bae6fd",
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  cryptoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  selectedCrypto: {
    borderColor: "#4ade80",
    backgroundColor: "rgba(74, 222, 128, 0.1)",
  },
  cryptoInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(79, 172, 254, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cryptoSymbol: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  cryptoDetails: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  cryptoPrice: {
    fontSize: 14,
    color: "#bae6fd",
  },
  cryptoRight: {
    alignItems: "flex-end",
  },
  cryptoChange: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  selectedPayment: {
    borderColor: "#4ade80",
    backgroundColor: "rgba(74, 222, 128, 0.1)",
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentDetails: {
    marginLeft: 12,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  paymentFee: {
    fontSize: 13,
    color: "#bae6fd",
  },
  buyButton: {
    marginHorizontal: 20,
    borderRadius: 25,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#4facfe",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 20,
  },
  buyGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  buyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
  bottomPadding: {
    height: 20,
  },
});
