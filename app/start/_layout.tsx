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
      <Stack.Screen name="index" />
      <Stack.Screen name="course" options={{ title: "Select Course" }} />
      <Stack.Screen name="add-players" options={{ title: "Add Players" }} />
      <Stack.Screen name="confirm" options={{ title: "Review & Create" }} />
    </Stack>
  );
}
