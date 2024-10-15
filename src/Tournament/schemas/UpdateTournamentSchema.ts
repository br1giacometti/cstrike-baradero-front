import { z } from "zod";

const updateTournamentSchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }).optional(),
  teamId: z
    .number()
    .min(1, { message: "Debe seleccionar una equipo" })
    .optional(),
  status: z
    .string()
    .min(1, { message: "Debe seleccionar una equipo" })
    .optional(),
});

export type UpdateTournamentSchema = z.infer<typeof updateTournamentSchema>;

export default updateTournamentSchema;
