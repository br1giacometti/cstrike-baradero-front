import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Map } from "../types";

type ListMapPayload = FetchPayload<Map[]>;

export type ListMapActions = BaseAction<ListMapPayload>;

type ListMapAction = ListMapActions[keyof ListMapActions];

interface ListMapState {
  data: Map[];
  loading: boolean;
  error?: string;
}

export const initialState: ListMapState = {
  data: [],
  loading: false,
};

const listMapReducer = (
  state: ListMapState = initialState,
  action: ListMapAction
): ListMapState => {
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
        data: action.payload,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        data: initialState.data,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default listMapReducer;
