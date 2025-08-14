// app/start/add-players.tsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRoundDraft } from "@/store/useRoundDraft";
import { v4 as uuidv4 } from "uuid";

export default function AddPlayers() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { players, addPlayer, removePlayer, course } = useRoundDraft();
  const [name, setName] = useState("");

  const onAdd = useCallback(() => {
    const n = name.trim();
    if (!n) return;
    // optional: prevent duplicates (case-insensitive)
    if (players.some((p) => p.name.toLowerCase() === n.toLowerCase())) {
      setName("");
      return;
    }
    addPlayer({ id: uuidv4(), name: n });
    setName("");
    Keyboard.dismiss();
  }, [name, players, addPlayer]);

  const onContinue = useCallback(() => {
    if (players.length === 0) return; // guarded by disabled state
    if (course?.id) router.push("/start/confirm");
    else router.push("/start/course");
  }, [players.length, course?.id, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Players</Text>

      <Input
        placeholder="Player name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={onAdd}
      />
      <View style={styles.inlineBtns}>
        <Button onPress={onAdd}>Add</Button>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: (insets.bottom || 16) + 88,
        }}
        data={players}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Pressable onPress={() => removePlayer(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No players yet.</Text>}
        keyboardShouldPersistTaps="handled"
      />

      <View style={[styles.footer, { bottom: insets.bottom || 16 }]}>
        <Button disabled={players.length === 0} onPress={onContinue}>
          Continue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  inlineBtns: { marginTop: 10, marginBottom: 16, width: "100%" },
  row: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerName: { color: "#111827", fontWeight: "500" },
  remove: { color: "#DC2626", fontWeight: "600" },
  empty: { color: "#6B7280", marginTop: 12 },
  footer: { position: "absolute", left: 24, right: 24 },
});
