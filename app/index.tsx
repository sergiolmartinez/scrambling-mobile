import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/Button";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scrambling</Text>
      <Text style={styles.subtitle}>Best‑ball scorekeeping made easy.</Text>

      <View style={{ marginTop: 24 }}>
        <Link href="/start" asChild>
          <Button>Start Game</Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    marginTop: 8,
  },
});
