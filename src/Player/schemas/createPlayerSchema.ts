import { z } from "zod";

const createPlayerSchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }),
  teamId: z.number().min(1, { message: "Debe seleccionar un equipo" }),
});

export type CreatePlayerSchema = z.infer<typeof createPlayerSchema>;

export default createPlayerSchema;
