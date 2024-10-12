import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createMapRepository from "../createMapRepository";

const useUpdateMapService = () => {
  const repository = useMemo(
    () => createMapRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateMap: repository.updateMap };
};

export default useUpdateMapService;
