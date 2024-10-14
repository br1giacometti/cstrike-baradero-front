import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";
import createMatchRepository from "../createMatchRepository";

const useDeleteMatchService = () => {
  const repository = useMemo(() => createMatchRepository(), []);

  return { deleteMatch: repository.deleteMatch };
};

export default useDeleteMatchService;
