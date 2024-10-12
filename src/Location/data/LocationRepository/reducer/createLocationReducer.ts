import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Location } from "../types";

type CreateLocationPayload = FetchPayload<Location> & {
  CLEAN_ERROR: undefined;
};

export type CreateLocationActions = BaseAction<CreateLocationPayload>;

type CreateLocationAction = CreateLocationActions[keyof CreateLocationActions];

interface CreateLocationState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateLocationState = {
  loading: false,
};

const createLocationReducer = (
  state: CreateLocationState = initialState,
  action: CreateLocationAction
): CreateLocationState => {
  switch (action.type) {
    case FetchActionTypes.Start: {
      return {
        ...state,
        loading: true,
      };
    }
    case FetchActionTypes.Succeess: {
      return {
        ...state,
        loading: false,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "CLEAN_ERROR": {
      return {
        ...state,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default createLocationReducer;
