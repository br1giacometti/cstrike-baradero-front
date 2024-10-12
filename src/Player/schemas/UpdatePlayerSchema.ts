import { z } from "zod";

const updatePlayerSchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }),
  teamId: z.number().min(1, { message: "Debe seleccionar una equipo" }),
});

export type UpdatePlayerSchema = z.infer<typeof updatePlayerSchema>;

export default updatePlayerSchema;
