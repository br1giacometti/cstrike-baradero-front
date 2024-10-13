import { z } from "zod";

const updateMatchSchema = z.object({
  map: z.string().min(2, { message: "nameMustBeAtleast3" }),
  resultTeamA: z
    .string()
    .transform((val) => {
      const parsed = Number.parseInt(val, 10);
      if (Number.isNaN(parsed)) {
        return null;
      }
      return parsed;
    })
    .optional(),
  resultTeamB: z
    .string()
    .transform((val) => {
      const parsed = Number.parseInt(val, 10);
      if (Number.isNaN(parsed)) {
        return null;
      }
      return parsed;
    })
    .optional(),
});
export type UpdateMatchSchema = z.infer<typeof updateMatchSchema>;

export default updateMatchSchema;
