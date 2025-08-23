import { StyleSheet, Text, View } from "react-native";

export default function TestIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 TEST INDEX WORKS! 🎉</Text>
      <Text style={styles.subtext}>This proves the routing is working</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6b6b",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
