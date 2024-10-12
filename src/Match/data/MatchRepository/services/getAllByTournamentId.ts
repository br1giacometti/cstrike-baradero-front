import matchClient from "../client";
import { Match } from "../types";

const getMatchesByFilters = async (
  tournamentId: number,
  teamAId: number,
  teamBId: number,
  matchDayId: number
): Promise<Match[]> => {
  // Construye la URL con los parámetros de consulta
  const response = await matchClient.get<Match[]>(
    `/match/filter?tournamentId=${tournamentId}&teamAId=${teamAId}&teamBId=${teamBId}&matchDayId=${matchDayId}`
  );

  return response.data;
};

export default getMatchesByFilters;
