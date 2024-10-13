import { useReducer } from "react";

import { MatchStats } from "MatchStats/data/MatchStatsRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createMatchStatsReducer from "MatchStats/data/MatchStatsRepository/reducer/createMatchStatsReducer";
import { initialState } from "MatchStats/data/MatchStatsRepository/reducer/listMatchStatsReducer";

const useCreateMatchStatsStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createMatchStatsReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: MatchStats) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateMatchStatsStates;
