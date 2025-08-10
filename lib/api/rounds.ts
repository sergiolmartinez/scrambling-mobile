import { api } from "./client";

export type CreateRoundPayload = { course_id: string; holes: number };
export const createRound = async (payload: CreateRoundPayload) => {
  const { data } = await api.post("/rounds", payload);
  return data; // expect { id, ... }
};

export const addPlayers = async (
  roundId: string,
  players: { name: string; color?: string }[]
) => {
  const { data } = await api.post(`/rounds/${roundId}/players`, { players });
  return data;
};
