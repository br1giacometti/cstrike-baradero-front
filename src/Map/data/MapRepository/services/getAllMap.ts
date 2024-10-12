import MapClient from "../client";
import { Map } from "../types";

const getAllMap = async () => {
  const response = await MapClient.get<Map[]>("/");

  return response.data;
};

export default getAllMap;
