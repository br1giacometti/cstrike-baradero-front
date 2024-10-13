import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createMatchStatsRepository from "../createMatchStatsRepository";

const useUpdateMatchStatsService = () => {
  const repository = useMemo(
    () => createMatchStatsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateMatchStats: repository.updateMatchStats };
};

export default useUpdateMatchStatsService;
