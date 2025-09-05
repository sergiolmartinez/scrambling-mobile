// app/start/confirm.tsx
import React, { useCallback, useState } from "react";
import { View, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { useRoundDraft } from "@/store/useRoundDraft";
import { kvSet } from "@/lib/db/sqlite";
import {
  createRound,
  addPlayersToRound,
  assignCourseToRound,
} from "@/lib/api/rounds";

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
      // 1) Create round
      const round = await createRound(); // ✅ returns payload directly
      const roundId = String(round.id);

      // 2) Add players (bulk, with single-add fallback handled in helper)
      const playersPayload = draft.players.map((p) => ({ name: p.name }));
      await addPlayersToRound(roundId, playersPayload);

      // 3) Assign course
      await assignCourseToRound(roundId, draft.course.id);

      // 4) Persist + navigate
      await kvSet("lastRoundId", roundId);
      draft.reset();
      router.replace(`/round/${roundId}`);
    } catch (e: any) {
      // Pinpoint which call failed by printing server response
      const status = e?.response?.status;
      const data = e?.response?.data;
      const msg = data?.detail ?? e?.message ?? "Could not create the round.";
      console.log("confirm.onCreate error", { status, data });
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
