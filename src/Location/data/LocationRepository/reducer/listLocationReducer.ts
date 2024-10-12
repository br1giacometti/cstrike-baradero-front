import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Location } from "../types";

type ListLocationPayload = FetchPayload<Location[]>;

export type ListLocationActions = BaseAction<ListLocationPayload>;

type ListLocationAction = ListLocationActions[keyof ListLocationActions];

interface ListLocationState {
  data: Location[];
  loading: boolean;
  error?: string;
}

export const initialState: ListLocationState = {
  data: [],
  loading: false,
};

const listLocationReducer = (
  state: ListLocationState = initialState,
  action: ListLocationAction
): ListLocationState => {
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

export default listLocationReducer;
