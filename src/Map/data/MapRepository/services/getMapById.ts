import MapClient from "../client";
import { Map } from "../types";

const getMapById = async (MapId: number) => {
  const response = await MapClient.get<Map>(`/${MapId}`);

  return response.data;
};

export default getMapById;
