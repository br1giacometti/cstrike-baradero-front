import { CreateMapSchema } from "Map/schemas/createMapSchema";
import { UpdateMapSchema } from "Map/schemas/updateMapSchema";

export interface Map {
  locations?: Location[];
  name: string;
  id: number;
  imageUrl: string;
  sizeX: number;
  sizeY: number;
  ubication: number;
}

export interface MapRepository {
  createMap: (body: CreateMapSchema) => Promise<Map>;
  getAllMap: () => Promise<Map[]>;
  getMapById: (MapId: number) => Promise<Map>;
  updateMap: (body: UpdateMapSchema, mapId: number) => Promise<Map>;
}
