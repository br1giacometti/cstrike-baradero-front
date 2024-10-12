import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createPlayerRepository from "../createProductRepository";

const useUpdatePlayerService = () => {
  const repository = useMemo(
    () => createPlayerRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updatePlayer: repository.updatePlayer };
};

export default useUpdatePlayerService;
