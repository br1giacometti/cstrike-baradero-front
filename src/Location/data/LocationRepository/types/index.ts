import { CreateLocationSchema } from "Location/schemas/createLocationSchema";

export interface Location {
  coordY: number;
  coordX: number;
  imageUrl: string;
  mapId: number;
  id: number;
}

export interface LocationRepository {
  createLocation: (body: CreateLocationSchema) => Promise<Location>;
  getAllLocation: () => Promise<Location[]>;
  getLocationById: (LocationId: number) => Promise<Location>;
}
