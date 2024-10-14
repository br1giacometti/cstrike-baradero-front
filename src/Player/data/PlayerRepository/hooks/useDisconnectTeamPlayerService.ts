import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createPlayerRepository from "../createProductRepository";

const useDisconnectTeamPlayerService = () => {
  const repository = useMemo(
    () => createPlayerRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { disconnectPlayer: repository.disconnectPlayer };
};

export default useDisconnectTeamPlayerService;
