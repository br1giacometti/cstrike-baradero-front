import { z } from "zod";

const createTeamSchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }),
});

export type CreateTeamSchema = z.infer<typeof createTeamSchema>;

export default createTeamSchema;
