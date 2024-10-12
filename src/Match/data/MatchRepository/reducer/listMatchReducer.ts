import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Match } from "../types";

type ListMatchPayload = FetchPayload<Match[]>;

export type ListMatchActions = BaseAction<ListMatchPayload>;

type ListMatchAction = ListMatchActions[keyof ListMatchActions];

interface ListMatchState {
  data: Match[];
  loading: boolean;
  error?: string;
}

export const initialState: ListMatchState = {
  data: [],
  loading: false,
};

const listMatchReducer = (
  state: ListMatchState = initialState,
  action: ListMatchAction
): ListMatchState => {
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

export default listMatchReducer;
