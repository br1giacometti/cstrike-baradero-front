import FetchActionTypes from "Base/types/FetchActionTypes";
import { Match } from "Match/data/MatchRepository";
import updateMatchReducer, {
  initialState,
} from "Match/data/MatchRepository/reducer/updateMatchReducer";
import { useReducer } from "react";

const useUpdateMatchStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateMatchReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Match) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useUpdateMatchStates;
