import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function WalletScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const cryptoAssets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: "0.0245",
      value: "$1,245.67",
      change: "+2.45%",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      amount: "1.56",
      value: "$3,890.12",
      change: "-1.23%",
    },
    {
      symbol: "SOL",
      name: "Solana",
      amount: "45.8",
      value: "$2,156.34",
      change: "+5.67%",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      amount: "1,250.00",
      value: "$1,250.00",
      change: "0.00%",
    },
  ];

  const recentTransactions = [
    {
      type: "received",
      amount: "+0.0025 BTC",
      time: "2 hours ago",
      status: "confirmed",
    },
    {
      type: "sent",
      amount: "-0.15 ETH",
      time: "1 day ago",
      status: "confirmed",
    },
    {
      type: "swap",
      amount: "SOL → USDC",
      time: "3 days ago",
      status: "confirmed",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome back</Text>
          <TouchableOpacity
            style={styles.profileFrame}
            onPress={() => router.replace("/(dashboard)/settings")}
            activeOpacity={0.7}
          >
            <Text style={styles.profileLetter}>
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total Balance Card */}
      <View style={styles.balanceCard}>
        <LinearGradient
          colors={["rgba(79, 172, 254, 0.3)", "rgba(0, 242, 254, 0.1)"]}
          style={styles.balanceGradient}
        >
          <Text style={styles.balanceLabel}>Total Portfolio Value</Text>
          <Text style={styles.balanceAmount}>$8,542.13</Text>
          <View style={styles.balanceChange}>
            <Ionicons name="trending-up" size={16} color="#4ade80" />
            <Text style={styles.changeText}>+$124.56 (1.48%) today</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={["#4facfe", "#00f2fe"]}
            style={styles.actionGradient}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionText}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={["#fa709a", "#fee140"]}
            style={styles.actionGradient}
          >
            <Ionicons name="arrow-up" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={["#a8edea", "#fed6e3"]}
            style={styles.actionGradient}
          >
            <Ionicons name="arrow-down" size={24} color="#333" />
          </LinearGradient>
          <Text style={styles.actionText}>Receive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.actionGradient}
          >
            <Ionicons name="swap-horizontal" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionText}>Swap</Text>
        </TouchableOpacity>
      </View>

      {/* Assets Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Assets</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {cryptoAssets.map((asset, index) => (
          <TouchableOpacity key={index} style={styles.assetCard}>
            <View style={styles.assetInfo}>
              <View style={styles.assetIcon}>
                <Text style={styles.assetSymbol}>{asset.symbol}</Text>
              </View>
              <View style={styles.assetDetails}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetAmount}>
                  {asset.amount} {asset.symbol}
                </Text>
              </View>
            </View>
            <View style={styles.assetValue}>
              <Text style={styles.assetPrice}>{asset.value}</Text>
              <Text
                style={[
                  styles.assetChange,
                  {
                    color: asset.change.startsWith("+")
                      ? "#4ade80"
                      : asset.change.startsWith("-")
                        ? "#f87171"
                        : "#94a3b8",
                  },
                ]}
              >
                {asset.change}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.map((tx, index) => (
          <View key={index} style={styles.transactionCard}>
            <View style={styles.transactionIcon}>
              <Ionicons
                name={
                  tx.type === "received"
                    ? "arrow-down"
                    : tx.type === "sent"
                      ? "arrow-up"
                      : "swap-horizontal"
                }
                size={20}
                color={
                  tx.type === "received"
                    ? "#4ade80"
                    : tx.type === "sent"
                      ? "#f87171"
                      : "#3b82f6"
                }
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionAmount}>{tx.amount}</Text>
              <Text style={styles.transactionTime}>{tx.time}</Text>
            </View>
            <View style={styles.transactionStatus}>
              <Text style={styles.statusText}>{tx.status}</Text>
            </View>
          </View>
        ))}
      </View>
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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  profileFrame: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(79, 172, 254, 0.2)",
    borderWidth: 2,
    borderColor: "rgba(79, 172, 254, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileLetter: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#bae6fd",
    opacity: 0.8,
  },
  balanceCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
  },
  balanceGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#e0e7ff",
    marginBottom: 8,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 12,
  },
  balanceChange: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 14,
    color: "#4ade80",
    marginLeft: 6,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
  },
  actionGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#e0e7ff",
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  seeAll: {
    fontSize: 14,
    color: "#4facfe",
    fontWeight: "600",
  },
  assetCard: {
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
  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  assetIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(79, 172, 254, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  assetSymbol: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  assetDetails: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  assetAmount: {
    fontSize: 13,
    color: "#bae6fd",
  },
  assetValue: {
    alignItems: "flex-end",
  },
  assetPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  assetChange: {
    fontSize: 13,
    fontWeight: "600",
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: "#bae6fd",
  },
  transactionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(74, 222, 128, 0.2)",
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    color: "#4ade80",
    fontWeight: "600",
  },
});
