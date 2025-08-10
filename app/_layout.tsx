// app/_layout.tsx
import "react-native-get-random-values";
import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";
import { useEffect } from "react";
import { initDb } from "@/lib/db/sqlite";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    initDb();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
          <Slot />
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
