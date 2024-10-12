import { LocationRepository } from "./types";

import getAllLocation from "./services/getAllLocation";
import LocationClient from "./client";
import getLocationById from "./services/getLocationById";
import createLocation from "./services/createLocation";

const createLocationRepository = (userToken: string): LocationRepository => {
  LocationClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createLocation,
    getAllLocation,
    getLocationById,
  };
};

export default createLocationRepository;
