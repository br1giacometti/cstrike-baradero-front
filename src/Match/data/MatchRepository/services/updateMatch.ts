import { UpdateMatchSchema } from "Match/schemas/UpdateMatchSchema";
import peopleClient from "../client";
import { Match } from "../types";

const updateMatch = async (
  body: UpdateMatchSchema,
  matchId: number
): Promise<Match> => {
  const response = await peopleClient.patch<Match>(`/${matchId}`, body);

  return response.data;
};

export default updateMatch;
