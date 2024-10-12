import { isAxiosError } from "axios";

import teamClient from "../client";
import { CreateTeamSchema } from "Team/schemas/createTeamSchema";

const createTeam = async (body: CreateTeamSchema) => {
  try {
    const response = await teamClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createTeam;
