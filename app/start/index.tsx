// app/start/index.tsx
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/Button";

export default function StartScreen() {
  return (
    <View className="flex-1 bg-bg px-6 py-8">
      <Text className="text-2xl font-semibold text-text mb-6">New Round</Text>
      <View className="gap-3">
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
