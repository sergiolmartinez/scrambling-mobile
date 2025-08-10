import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRoundDraft } from "@/store/useRoundDraft";
// import * as Crypto from "expo-crypto";
import { v4 as uuidv4 } from "uuid";

export default function AddPlayers() {
  const [name, setName] = useState("");
  const { players, addPlayer, removePlayer } = useRoundDraft();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Players</Text>
      <Input placeholder="Player name" value={name} onChangeText={setName} />
      <View style={styles.addButton}>
        <Button
          onPress={() => {
            if (name.trim()) {
              // addPlayer({ id: Crypto.randomUUID(), name: name.trim() });
              addPlayer({ id: uuidv4(), name: name.trim() });

              setName("");
            }
          }}
        >
          Add Player
        </Button>
      </View>

      <FlatList
        data={players}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Button onPress={() => removePlayer(item.id)}>Remove</Button>
          </View>
        )}
      />
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
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 12,
  },
  addButton: { marginTop: 12, marginBottom: 16 },
  playerItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerName: { color: "#222222" },
});
