import { UpdateTournamentSchema } from "Tournament/schemas/UpdateTournamentSchema";
import peopleClient from "../client";
import { Tournament } from "../types";

const updateTournament = async (
  body: UpdateTournamentSchema,
  tournamentId: number
): Promise<Tournament> => {
  const response = await peopleClient.patch<Tournament>(
    `/${tournamentId}`,
    body
  );

  return response.data;
};

export default updateTournament;
