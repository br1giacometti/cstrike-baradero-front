import { z } from "zod";

const createTournamentSchema = z.object({
  name: z.string().min(2, { message: "nameMustBeAtleast3" }),
  teams: z
    .array(
      z.object({
        id: z.number().int(), // Aquí especificas que id debe ser un número entero
      })
    )
    .nonempty({ message: "teamsMustNotBeEmpty" }), // Asegúrate de que el array no esté vacío
});

export type CreateTournamentSchema = z.infer<typeof createTournamentSchema>;

export default createTournamentSchema;
