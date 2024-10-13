import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createMatchStatsRepository from "../createMatchStatsRepository";

const useDeleteMatchStatsService = () => {
  const repository = useMemo(
    () => createMatchStatsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { deleteMatchStats: repository.deleteMatchStats };
};

export default useDeleteMatchStatsService;
