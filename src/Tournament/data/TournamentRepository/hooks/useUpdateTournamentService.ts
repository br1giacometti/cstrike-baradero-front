import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createTournamentRepository from "../createTournamentRepository";

const useUpdateTournamentService = () => {
  const repository = useMemo(
    () => createTournamentRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateTournament: repository.updateTournament };
};

export default useUpdateTournamentService;
