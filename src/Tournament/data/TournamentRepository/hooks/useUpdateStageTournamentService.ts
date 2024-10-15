import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createTournamentRepository from "../createTournamentRepository";

const useUpdateStageTournamentService = () => {
  const repository = useMemo(
    () => createTournamentRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateTournamentStage: repository.updateTournamentStage };
};

export default useUpdateStageTournamentService;
