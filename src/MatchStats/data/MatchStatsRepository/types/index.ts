import { CreateMatchSchema } from "Match/schemas/createMatchSchema";
import { UpdateMatchSchema } from "Match/schemas/UpdateMatchSchema";
import { MatchDay } from "MatchDay/data/MatchDayRepository";
import { Team } from "Team/data/TeamRepository";
import { Tournament } from "Tournament/data/TournamentRepository";

export interface MatchStats {
  id: number;
  matchId: number;
  playerId: number;
  teamId: number;
  kills: number;
  deaths: number;
}

export interface MatchStatsRepository {
  createMatchStats: (body: CreateMatchSchema) => Promise<MatchStats>;
  getAllMatchStats: () => Promise<MatchStats[]>;
  deleteMatchStats: (matchdayId: number) => Promise<boolean>;
  getMatchStatsById: (matchdayId: number) => Promise<MatchStats>;
  updateMatchStats: (
    body: UpdateMatchSchema,
    matchId: number
  ) => Promise<MatchStats>;
}
