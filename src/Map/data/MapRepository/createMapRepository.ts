import { MapRepository } from "./types";
import createMap from "./services/createMap";
import getAllMap from "./services/getAllMap";
import MapClient from "./client";
import getMapById from "./services/getMapById";
import updateMap from "./services/updateMap";

const createMapRepository = (userToken: string): MapRepository => {
  MapClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createMap,
    getAllMap,
    getMapById,
    updateMap,
  };
};

export default createMapRepository;
