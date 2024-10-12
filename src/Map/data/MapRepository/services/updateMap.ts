import { UpdateMapSchema } from "Map/schemas/updateMapSchema";
import peopleClient from "../client";
import { Map } from "../types";

const updateMap = async (
  body: UpdateMapSchema,
  mapId: number
): Promise<Map> => {
  const response = await peopleClient.patch<Map>(`/${mapId}`, body);

  return response.data;
};

export default updateMap;
