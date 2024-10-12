import { useReducer } from "react";

import { Team } from "Team/data/TeamRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createTeamReducer from "Team/data/TeamRepository/reducer/createTeamReducer";
import { initialState } from "Team/data/TeamRepository/reducer/listTeamReducer";

const useCreateTeamStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createTeamReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Team) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateTeamStates;
