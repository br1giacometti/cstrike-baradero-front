import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createTeamRepository from "../createTeamRepository";

const useDeleteTeamService = () => {
  const repository = useMemo(
    () => createTeamRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { deleteTeam: repository.deleteTeam };
};

export default useDeleteTeamService;
