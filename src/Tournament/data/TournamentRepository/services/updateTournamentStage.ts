import { UpdateTournamentSchema } from "Tournament/schemas/UpdateTournamentSchema";
import peopleClient from "../client";
import { Tournament } from "../types";

const updateTournamentStage = async (
  body: UpdateTournamentSchema,
  tournamentId: number
): Promise<Tournament> => {
  const response = await peopleClient.patch<Tournament>(
    `/updatestage/${tournamentId}`,
    body
  );

  return response.data;
};

export default updateTournamentStage;
