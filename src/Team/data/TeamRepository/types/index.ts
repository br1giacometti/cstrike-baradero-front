import { Category } from "Category/data/CategoryRepository";
import { CreateTeamSchema } from "Team/schemas/createTeamSchema";
import { UpdateTeamSchema } from "Team/schemas/UpdateProductSchema";

export interface Team {
  name: string;
  //players: Player[]
  id: number;
}

export interface TeamRepository {
  createTeam: (body: CreateTeamSchema) => Promise<Team>;
  getAllTeam: () => Promise<Team[]>;
  deleteTeam: (TeamId: number) => Promise<boolean>;
  getTeamById: (TeamId: number) => Promise<Team>;
  updateTeam: (body: UpdateTeamSchema, TeamId: number) => Promise<Team>;
}
