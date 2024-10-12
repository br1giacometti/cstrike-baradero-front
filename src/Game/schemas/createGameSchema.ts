import { z } from "zod";

export const CreateGameSchema = z.object({
  totalScore: z.number(),
  gameResults: z.array(
    z.object({
      locationId: z.number(),
      selectedX: z.number(),
      selectedY: z.number(),
      mapId: z.number(),
      score: z.number(),
    })
  ),
});

export type CreateGameSchema = z.infer<typeof CreateGameSchema>;
