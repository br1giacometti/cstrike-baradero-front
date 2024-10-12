import { User } from "Auth/types";
import { CreateGameSchema } from "Game/schemas/createGameSchema";

export interface GameResult {
  id?: number;
  gameId: number;
  locationId: number;
  selectedX: number;
  selectedY: number;
  mapId: number;
  score: number;
  createdAt?: Date;
}

export interface Game {
  totalScore?: number;
  createdAt?: Date;
  userId?: string;
  user?: User;
  gameResults?: GameResult[];
  id?: number;
}

export interface GameRepository {
  createGame: (body: CreateGameSchema) => Promise<Game>;
  getAllGame: () => Promise<Game[]>;
  getGameById: (GameId: number) => Promise<Game>;
}
