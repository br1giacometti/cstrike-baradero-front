import { z } from "zod";

const matchSchema = z.object({
  teamAId: z.number().positive().int(),
  teamBId: z.number().positive().int(),
});

const createMatchSchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }),
});

export type CreateMatchSchema = z.infer<typeof createMatchSchema>;

export default createMatchSchema;
