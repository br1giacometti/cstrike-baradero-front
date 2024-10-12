import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Map } from "../types";

type CreateMapPayload = FetchPayload<Map> & {
  CLEAN_ERROR: undefined;
};

export type CreateMapActions = BaseAction<CreateMapPayload>;

type CreateMapAction = CreateMapActions[keyof CreateMapActions];

interface CreateMapState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateMapState = {
  loading: false,
};

const createMapReducer = (
  state: CreateMapState = initialState,
  action: CreateMapAction
): CreateMapState => {
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

export default createMapReducer;
