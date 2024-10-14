import tournamentClient from "../client";
import { Score } from "../types";

const getAllScore = async () => {
  const response = await tournamentClient.get<Score[]>("/points/1");

  return response.data;
};

export default getAllScore;
