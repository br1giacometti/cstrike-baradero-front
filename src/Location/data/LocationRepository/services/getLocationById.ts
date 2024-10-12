import LocationClient from "../client";
import { Location } from "../types";

const getLocationById = async (LocationId: number) => {
  const response = await LocationClient.get<Location>(`/${LocationId}`);

  return response.data;
};

export default getLocationById;
