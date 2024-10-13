import FetchActionTypes from "Base/types/FetchActionTypes";
import { MatchStats } from "MatchStats/data/MatchStatsRepository";
import updateMatchStatsReducer, {
  initialState,
} from "MatchStats/data/MatchStatsRepository/reducer/updateMatchStatsReducer";
import { useReducer } from "react";

const useUpdateMatchStatsStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateMatchStatsReducer,
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

export default useUpdateMatchStatsStates;
