import { z } from "zod";

const updateTeamSchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }),
});

export type UpdateTeamSchema = z.infer<typeof updateTeamSchema>;

export default updateTeamSchema;
