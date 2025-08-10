import { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRoundDraft } from "@/store/useRoundDraft";
import { useQuery } from "@tanstack/react-query";
import { searchCourses } from "@/lib/api/courses";

export default function CourseSelect() {
  const [q, setQ] = useState("");
  const setCourse = useRoundDraft((s) => s.setCourse);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["courses", q],
    queryFn: () => searchCourses(q),
    enabled: false,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Where are you playing?</Text>
      <Input placeholder="Search courses" value={q} onChangeText={setQ} />
      <View style={styles.searchButton}>
        <Button onPress={() => refetch()} disabled={!q || isFetching}>
          {isFetching ? "Searching..." : "Search"}
        </Button>
      </View>

      <FlatList
        data={data || []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setCourse({ id: item.id, name: item.name })}
            style={styles.courseItem}
          >
            <Text style={styles.courseName}>{item.name}</Text>
            {item.city ? (
              <Text style={styles.courseCity}>{item.city}</Text>
            ) : null}
          </Pressable>
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
  searchButton: { marginTop: 12, marginBottom: 16 },
  courseItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  courseName: { fontWeight: "500", color: "#222222" },
  courseCity: { color: "#6B7280" },
});
