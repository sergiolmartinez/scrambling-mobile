import { create } from "zustand";

type PlayerDraft = { id: string; name: string; color?: string };
type Draft = {
  course: { id?: string; name?: string } | null;
  holes: number; // 9 or 18
  players: PlayerDraft[];
  setCourse: (c: Draft["course"]) => void;
  setHoles: (n: number) => void;
  addPlayer: (p: PlayerDraft) => void;
  removePlayer: (id: string) => void;
  reset: () => void;
};

export const useRoundDraft = create<Draft>((set) => ({
  course: null,
  holes: 18,
  players: [],
  setCourse: (course) => set({ course }),
  setHoles: (holes) => set({ holes }),
  addPlayer: (p) => set((s) => ({ players: [...s.players, p] })),
  removePlayer: (id) =>
    set((s) => ({ players: s.players.filter((p) => p.id !== id) })),
  reset: () => set({ course: null, holes: 18, players: [] }),
}));
