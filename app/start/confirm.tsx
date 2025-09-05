import React, { useCallback, useState } from "react";
import { View, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { useRoundDraft } from "@/store/useRoundDraft";
import { api } from "@/lib/api/client";
import { kvSet } from "@/lib/db/sqlite";

export default function ConfirmRound() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const draft = useRoundDraft();
  const [submitting, setSubmitting] = useState(false);

  const ready = !!draft.course?.id && draft.players.length > 0;

  const onCreate = useCallback(async () => {
    if (!draft.course?.id) return Alert.alert("Select a course first.");
    if (draft.players.length === 0)
      return Alert.alert("Add at least one player.");
    setSubmitting(true);
    try {
      // 1) create empty round
      const { data: round } = await api.post("/rounds", {}); // adjust body if your backend needs fields
      const roundId = String(round.id);

      // 2) add players
      for (const p of draft.players) {
        await api.post(`/rounds/${roundId}/players`, { name: p.name });
      }

      // 3) assign course
      await api.post(`/courses/assign/${roundId}/${draft.course.id}`);

      // 4) persist + navigate
      await kvSet("lastRoundId", roundId);
      draft.reset();
      router.replace(`/round/${roundId}`);
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ??
        e?.message ??
        "Could not create the round.";
      Alert.alert("Error", String(msg));
    } finally {
      setSubmitting(false);
    }
  }, [draft, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review & Create</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Course</Text>
        <Text style={styles.value}>{draft.course?.name ?? "—"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Players</Text>
        {draft.players.length === 0 ? (
          <Text style={styles.muted}>No players</Text>
        ) : (
          draft.players.map((p) => (
            <Text key={p.id} style={styles.value}>
              • {p.name}
            </Text>
          ))
        )}
      </View>

      <View style={[styles.footer, { bottom: insets.bottom || 16 }]}>
        <Button disabled={!ready || submitting} onPress={onCreate}>
          {submitting ? "Creating…" : "Create Round"}
        </Button>
        {submitting && (
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        )}
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
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginBottom: 12,
  },
  label: { color: "#111827", fontWeight: "600", marginBottom: 6 },
  value: { color: "#374151", lineHeight: 22 },
  muted: { color: "#6B7280" },
  footer: { position: "absolute", left: 24, right: 24 },
});
