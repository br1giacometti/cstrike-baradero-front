import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Map } from "../types";

type UpdateMapPayload = FetchPayload<Map> & {
  CLEAN_ERROR: undefined;
};

export type UpdateMapActions = BaseAction<UpdateMapPayload>;

type UpdateMapAction = UpdateMapActions[keyof UpdateMapActions];

interface UpdateMapState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateMapState = {
  loading: false,
};

const updateMapReducer = (
  state: UpdateMapState = initialState,
  action: UpdateMapAction
): UpdateMapState => {
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

export default updateMapReducer;
