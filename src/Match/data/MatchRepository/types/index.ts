import { CreateMatchSchema } from "Match/schemas/createMatchSchema";
import { UpdateMatchSchema } from "Match/schemas/UpdateMatchSchema";
import { MatchDay } from "MatchDay/data/MatchDayRepository";
import { Team } from "Team/data/TeamRepository";
import { Tournament } from "Tournament/data/TournamentRepository";

export interface Match {
  id: number;
  matchDayId: number;
  teamAId: number; // Asegúrate de que estas propiedades estén presentes
  teamBId: number; // Asegúrate de que estas propiedades estén presentes
  map?: string;
  resultTeamA?: number;
  resultTeamB?: number;
  teamA?: Team;
  teamB?: Team;
  tournament?: Tournament;
  matchDay?: MatchDay;
}

export interface MatchRepository {
  createMatch: (body: CreateMatchSchema) => Promise<Match>;
  getAllMatch: () => Promise<Match[]>;
  fetchAllMatchsById: (matchDayId: number, teamId: number) => Promise<Match[]>;
  deleteMatch: (matchdayId: number) => Promise<boolean>;
  getMatchById: (matchdayId: number) => Promise<Match>;
  updateMatch: (body: UpdateMatchSchema, matchId: number) => Promise<Match>;
}
