import { useReducer } from "react";

import { Location } from "Location/data/LocationRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createLocationReducer from "Location/data/LocationRepository/reducer/createLocationReducer";
import { initialState } from "Location/data/LocationRepository/reducer/listLocationReducer";

const useCreateLocationStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createLocationReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Location) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateLocationStates;
