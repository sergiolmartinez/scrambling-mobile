import "react-native-get-random-values";
import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { initDb } from "@/lib/db/sqlite";

const qc = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    initDb();
  }, []);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={qc}>
        <Slot />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
