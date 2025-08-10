import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/Button";

export default function Start() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Round</Text>
      <View style={styles.buttonGroup}>
        <Link href="/start/course" asChild>
          <Button>Select Course</Button>
        </Link>
        <Link href="/start/add-players" asChild>
          <Button>Add Players</Button>
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
    paddingVertical: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 24,
  },
  buttonGroup: { gap: 12 },
});
