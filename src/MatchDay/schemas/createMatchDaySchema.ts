import { z } from "zod";

const matchSchema = z.object({
  teamAId: z.number().positive().int(),
  teamBId: z.number().positive().int(),
});

const createMatchDaySchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }),
});

export type CreateMatchDaySchema = z.infer<typeof createMatchDaySchema>;

export default createMatchDaySchema;
