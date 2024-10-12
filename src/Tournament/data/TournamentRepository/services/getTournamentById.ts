import tournamentClient from "../client";
import { Tournament } from "../types";

const getTournamentById = async (tournamentId: number) => {
  const response = await tournamentClient.get<Tournament>(`/${tournamentId}`);

  return response.data;
};

export default getTournamentById;
