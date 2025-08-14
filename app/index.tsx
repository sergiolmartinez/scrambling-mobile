// app/index.tsx
import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/Button";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />
        {/* <Text style={styles.logoEmoji}>⛳️</Text> */}
      </View>

      {/* <Text style={styles.title}>Scrambling</Text> */}
      {/* <Text style={styles.subtitle}>
        Best‑ball scorekeeping made easy. Start a round and add players & course
        next.
      </Text> */}

      <View style={styles.actions}>
        <Link href="/start" asChild>
          <Button>Start Game</Button>
        </Link>
      </View>

      {/* Optional legal / version footer */}
      <Text style={styles.footerText}>v0.1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: { alignItems: "center", marginBottom: 16 },
  logo: { width: 240, height: 240, borderRadius: 16 },
  logoEmoji: { fontSize: 56 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#222222",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    maxWidth: 320,
  },
  actions: { marginTop: 24, width: "100%", maxWidth: 360 },
  footerText: {
    position: "absolute",
    bottom: 12,
    color: "#9CA3AF",
    fontSize: 12,
  },
});
