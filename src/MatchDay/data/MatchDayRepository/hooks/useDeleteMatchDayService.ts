import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createMatchDayRepository from "../createMatchDayRepository";

const useDeleteMatchDayService = () => {
  const repository = useMemo(
    () => createMatchDayRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { deleteMatchDay: repository.deleteMatchDay };
};

export default useDeleteMatchDayService;
