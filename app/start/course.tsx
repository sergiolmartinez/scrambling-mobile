import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRoundDraft } from "@/store/useRoundDraft";
import { searchCourses } from "@/lib/api/courses";

export default function CourseSelect() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { course, setCourse, players } = useRoundDraft();
  const selectedId = course?.id;

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const debouncedRef = useRef<NodeJS.Timeout | null>(null);

  const doSearch = useCallback(async (term: string) => {
    if (!term || term.length < 2) {
      setResults([]);
      setErr(null);
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const data = await searchCourses(term);
      setResults(data);
    } catch (e: any) {
      setErr(e?.message ?? "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const onContinue = useCallback(() => {
    if (!selectedId) return; // guarded by disabled state
    if (players.length > 0) router.push("/start/confirm");
    else router.push("/start/add-players");
  }, [players.length, router, selectedId]);

  useEffect(() => {
    if (debouncedRef.current) clearTimeout(debouncedRef.current);
    debouncedRef.current = setTimeout(() => doSearch(search), 300);
    return () => {
      if (debouncedRef.current) clearTimeout(debouncedRef.current);
    };
  }, [search, doSearch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find a Course</Text>

      <Input
        placeholder="Search by course name, city…"
        value={search}
        onChangeText={setSearch}
      />

      {err && <Text style={styles.error}>{err}</Text>}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )}

      {!loading && !err && results.length === 0 && search.length >= 2 && (
        <Text style={styles.empty}>No results for “{search}”.</Text>
      )}

      <FlatList
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: (insets.bottom || 16) + 88,
        }}
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const id = String(item.id);
          const title = item.course_name ?? "Unnamed Course";
          const subtitle = [item.city, item.state, item.country]
            .filter(Boolean)
            .join(", ");
          const isSelected = selectedId && String(selectedId) === id;

          return (
            <Pressable
              onPress={() => setCourse({ id, name: title })}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <View>
                <Text style={styles.courseName}>{title}</Text>
                {!!subtitle && (
                  <Text style={styles.courseCity}>{subtitle}</Text>
                )}
              </View>
              {isSelected ? (
                <Text style={styles.selected}>Selected</Text>
              ) : null}
            </Pressable>
          );
        }}
      />

      <View style={[styles.footer, { bottom: insets.bottom || 16 }]}>
        <Button disabled={!selectedId} onPress={onContinue}>
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
  error: { color: "#DC2626", marginTop: 8 },
  loading: { marginTop: 12 },
  empty: { color: "#6B7280", marginTop: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardSelected: { borderColor: "#00C853" },
  courseName: { color: "#111827", fontWeight: "600" },
  courseCity: { color: "#6B7280" },
  selected: { color: "#00C853", fontWeight: "700" },
  footer: { position: "absolute", left: 24, right: 24 },
});
