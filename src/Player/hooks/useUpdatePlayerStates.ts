import FetchActionTypes from "Base/types/FetchActionTypes";
import { Player } from "Player/data/PlayerRepository";
import updatePlayerReducer, {
  initialState,
} from "Player/data/PlayerRepository/reducer/updatePlayerReducer";
import { useReducer } from "react";

const useUpdatePlayerStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updatePlayerReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Player) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useUpdatePlayerStates;
