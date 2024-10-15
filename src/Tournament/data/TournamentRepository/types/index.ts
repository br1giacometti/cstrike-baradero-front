import { Match, MatchDay } from "MatchDay/data/MatchDayRepository";
import { Team } from "Team/data/TeamRepository";
import { CreateTournamentSchema } from "Tournament/schemas/createTournamentSchema";
import { UpdateTournamentSchema } from "Tournament/schemas/UpdateTournamentSchema";

export enum TournamentStatus {
  SCHEDULED = "SCHEDULED",
  ONGOING = "ONGOING",
  SEMIFINALS = "SEMIFINALS",
  FINAL = "FINAL",
  COMPLETED = "COMPLETED",
}

export interface Tournament {
  name: string;
  createdAt: Date;
  teams: Team[];
  matches: Match[];
  id: number;
  MatchDay: MatchDay[];
  status: TournamentStatus;
}

export interface Fixture {
  name: string;
  createdAt: Date;
  teams: Team[];
  matches: Match[];
  id: number;
  MatchDay: MatchDay[];
  status: TournamentStatus;
}

export interface Score {
  idEquipo: number;
  nombreEquipo: string;
  victoriasTotales: number;
  derrotasTotales: number;
  puntuacionTotal: number;
}

export interface TournamentRepository {
  createTournament: (body: CreateTournamentSchema) => Promise<Tournament>;
  getAllTournament: () => Promise<Tournament[]>;
  getAllFixture: () => Promise<Fixture[]>;
  getAllScore: () => Promise<Score[]>;
  deleteTournament: (tournamentId: number) => Promise<boolean>;
  getTournamentById: (tournamentId: number) => Promise<Tournament>;
  updateTournament: (
    body: UpdateTournamentSchema,
    tournamentId: number
  ) => Promise<Tournament>;
}
