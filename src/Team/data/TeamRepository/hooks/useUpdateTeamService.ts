import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createTeamRepository from "../createTeamRepository";

const useUpdateTeamService = () => {
  const repository = useMemo(
    () => createTeamRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateTeam: repository.updateTeam };
};

export default useUpdateTeamService;
