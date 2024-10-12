import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createPlayerRepository from "../createProductRepository";

const useDeletePlayerService = () => {
  const repository = useMemo(
    () => createPlayerRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { deletePlayer: repository.deletePlayer };
};

export default useDeletePlayerService;
