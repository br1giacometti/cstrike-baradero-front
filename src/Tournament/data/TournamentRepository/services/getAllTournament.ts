import tournamentClient from "../client";
import { Tournament } from "../types";

const getAllTournament = async () => {
  const response = await tournamentClient.get<Tournament[]>("/");

  return response.data;
};

export default getAllTournament;
