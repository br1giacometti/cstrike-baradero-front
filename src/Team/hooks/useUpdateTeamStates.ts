import FetchActionTypes from "Base/types/FetchActionTypes";
import { Team } from "Team/data/TeamRepository";
import updateTeamReducer, {
  initialState,
} from "Team/data/TeamRepository/reducer/updateTeamReducer";
import { useReducer } from "react";

const useUpdateTeamStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateTeamReducer,
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

export default useUpdateTeamStates;
