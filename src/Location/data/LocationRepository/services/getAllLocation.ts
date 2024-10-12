import LocationClient from "../client";
import { Location } from "../types";

const getAllLocation = async () => {
  const response = await LocationClient.get<Location[]>("/");

  return response.data;
};

export default getAllLocation;
