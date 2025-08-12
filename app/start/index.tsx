import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/Button";

export default function StartHub() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Setup Game</Text>
      <View style={styles.buttonGroup}>
        <Link href="/start/add-players" asChild>
          <Button>Add Players</Button>
        </Link>
        <Link href="/start/course" asChild>
          <Button>Find a Course</Button>
        </Link>
        {/* later: <Link href="/start/confirm" asChild><Button>Review & Create</Button></Link> */}
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
    marginBottom: 16,
  },
  buttonGroup: { gap: 12 },
});
