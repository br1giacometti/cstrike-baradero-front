import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createTournamentRepository from "../createTournamentRepository";

const useDeleteTournamentService = () => {
  const repository = useMemo(
    () => createTournamentRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { deleteTournament: repository.deleteTournament };
};

export default useDeleteTournamentService;
