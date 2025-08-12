import { Stack } from "expo-router";

export default function StartLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: "#F7F7F7" },
      }}
    >
      {/* Declare Start flow screens here if you want custom titles later */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="course" options={{ title: "Select Course" }} />
      <Stack.Screen name="add-players" options={{ title: "Add Players" }} />
      {/* add more (confirm, etc.) as you build them */}
    </Stack>
  );
}
