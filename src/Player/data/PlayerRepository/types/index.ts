import { Category } from "Category/data/CategoryRepository";
import { CreatePlayerSchema } from "Player/schemas/createPlayerSchema";
import { UpdatePlayerSchema } from "Player/schemas/UpdatePlayerSchema";

import { Team } from "Team/data/TeamRepository";

export interface Player {
  name: string;
  createdAt?: Date;
  teamId: number;
  team?: Team;
  id: number;
  kills?: number;
  deaths?: number;
}

export interface updatePricePlayerDto {
  sellPrice: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PlayerPaginatedReturn {
  data: Player[];
  meta: PaginationMeta;
}

export interface PlayerRepository {
  createPlayer: (body: CreatePlayerSchema) => Promise<Player>;
  getAllPlayer: () => Promise<Player[]>;
  getAllPlayerPaginated: (
    page?: number,
    limit?: number,
    query?: string,
    teamId?: string
  ) => Promise<PlayerPaginatedReturn>;
  disconnectPlayer: (playerId: number) => Promise<boolean>;
  deletePlayer: (playerId: number) => Promise<boolean>;
  connectPlayer: (playerId: number, teamId: number) => Promise<boolean>;
  getPlayerById: (playerId: number) => Promise<Player>;
  updatePlayer: (body: UpdatePlayerSchema, playerId: number) => Promise<Player>;
}
