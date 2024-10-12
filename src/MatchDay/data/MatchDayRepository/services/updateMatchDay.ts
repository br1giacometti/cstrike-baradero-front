import { UpdateMatchDaySchema } from "MatchDay/schemas/UpdateTournamentSchema";
import peopleClient from "../client";
import { MatchDay } from "../types";

const updateMatchDay = async (
  body: UpdateMatchDaySchema,
  matchdayId: number
): Promise<MatchDay> => {
  const response = await peopleClient.patch<MatchDay>(`/${matchdayId}`, body);

  return response.data;
};

export default updateMatchDay;
