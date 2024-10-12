import { isAxiosError } from "axios";

import tournamentClient from "../client";
import { CreateTournamentSchema } from "Tournament/schemas/createTournamentSchema";

const createTournament = async (body: CreateTournamentSchema) => {
  try {
    const response = await tournamentClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createTournament;
