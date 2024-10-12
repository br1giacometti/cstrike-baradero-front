import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createMatchRepository from "../createMatchRepository";

const useUpdateMatchService = () => {
  const repository = useMemo(
    () => createMatchRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateMatch: repository.updateMatch };
};

export default useUpdateMatchService;
