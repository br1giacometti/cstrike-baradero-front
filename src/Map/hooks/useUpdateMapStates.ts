import FetchActionTypes from "Base/types/FetchActionTypes";
import { Map } from "Map/data/MapRepository";
import updateMapReducer, {
  initialState,
} from "Map/data/MapRepository/reducer/updateMapReducer";
import { useReducer } from "react";

const useUpdateMapStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateMapReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Map) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useUpdateMapStates;
