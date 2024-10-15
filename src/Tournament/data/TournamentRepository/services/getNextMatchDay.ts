import { MatchDay } from "MatchDay/data/MatchDayRepository";
import tournamentClient from "../client";
import { Fixture, Tournament } from "../types";

const getNextMatchDay = async () => {
  const response = await tournamentClient.get<MatchDay[]>("/nextmatchday");

  return response.data;
};

export default getNextMatchDay;
