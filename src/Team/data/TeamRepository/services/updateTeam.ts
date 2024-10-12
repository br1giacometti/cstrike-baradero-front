import { UpdateTeamSchema } from "Team/schemas/UpdateProductSchema";
import peopleClient from "../client";
import { Team } from "../types";

const updateTeam = async (
  body: UpdateTeamSchema,
  teamId: number
): Promise<Team> => {
  const response = await peopleClient.patch<Team>(`/${teamId}`, body);

  return response.data;
};

export default updateTeam;
