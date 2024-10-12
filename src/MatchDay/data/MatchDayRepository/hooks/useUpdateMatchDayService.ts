import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createMatchDayRepository from "../createMatchDayRepository";

const useUpdateMatchDayService = () => {
  const repository = useMemo(
    () => createMatchDayRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateMatchDay: repository.updateMatchDay };
};

export default useUpdateMatchDayService;
