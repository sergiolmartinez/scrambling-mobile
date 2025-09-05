// lib/api/rounds.ts
import { api } from "./client";

export type CreatedRound = { id: number | string };

// POST /rounds  -> returns { id, ... }
export const createRound = async (): Promise<CreatedRound> => {
  const { data } = await api.post("/rounds", {}); // no trailing slash per your backend
  return data;
};

// Preferred: bulk add players if your backend supports it:
//   POST /players/rounds/:roundId/players  body: { players: [{ name }] }
export const addPlayersToRound = async (
  roundId: string | number,
  players: { name: string }[]
) => {
  try {
    const { data } = await api.post(`/players/rounds/${roundId}/players`, {
      players,
    });
    return data;
  } catch (e: any) {
    // If the API *doesn't* accept bulk (expects {name}), fall back to one-by-one.
    const status = e?.response?.status;
    const detail = e?.response?.data;
    console.log("addPlayersToRound bulk failed", { status, detail });
    if (status === 422) {
      for (const p of players) {
        await api.post(`/players/rounds/${roundId}/players`, { name: p.name });
      }
      return { ok: true, mode: "fallback-single" as const };
    }
    throw e;
  }
};

// Assign a course to a round
//   POST /courses/assign/:roundId/:courseId
export const assignCourseToRound = async (
  roundId: string | number,
  courseId: string | number
) => {
  const { data } = await api.post(`/courses/assign/${roundId}/${courseId}`);
  return data;
};
