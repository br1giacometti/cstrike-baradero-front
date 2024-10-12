import FetchActionTypes from "Base/types/FetchActionTypes";
import { MatchDay } from "MatchDay/data/MatchDayRepository";
import updateMatchDayReducer, {
  initialState,
} from "MatchDay/data/MatchDayRepository/reducer/updateMatchDayReducer";
import { useReducer } from "react";

const useUpdateMatchDayStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateMatchDayReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: MatchDay) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useUpdateMatchDayStates;
