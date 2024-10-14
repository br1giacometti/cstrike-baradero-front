import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createPlayerRepository from "../createProductRepository";

const useConnectTeamPlayerService = () => {
  const repository = useMemo(
    () => createPlayerRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { connectPlayer: repository.connectPlayer };
};

export default useConnectTeamPlayerService;
