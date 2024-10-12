import { CreateMatchDaySchema } from "MatchDay/schemas/createMatchDaySchema";
import { UpdateMatchDaySchema } from "MatchDay/schemas/UpdateTournamentSchema";
import { Team } from "Team/data/TeamRepository";
import { Tournament } from "Tournament/data/TournamentRepository";

export interface MatchDay {
  name: string;
  matches: Match[];
  id: number;
}

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

export interface MatchDayRepository {
  createMatchDay: (body: CreateMatchDaySchema) => Promise<MatchDay>;
  getAllMatchDay: () => Promise<MatchDay[]>;
  deleteMatchDay: (matchdayId: number) => Promise<boolean>;
  getMatchDayById: (matchdayId: number) => Promise<MatchDay>;
  updateMatchDay: (
    body: UpdateMatchDaySchema,
    matchdayId: number
  ) => Promise<MatchDay>;
}
