import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { MatchStats } from "../types";

type ListMatchStatsPayload = FetchPayload<MatchStats[]>;

export type ListMatchStatsActions = BaseAction<ListMatchStatsPayload>;

type ListMatchStatsAction = ListMatchStatsActions[keyof ListMatchStatsActions];

interface ListMatchStatsState {
  data: MatchStats[];
  loading: boolean;
  error?: string;
}

export const initialState: ListMatchStatsState = {
  data: [],
  loading: false,
};

const listMatchStatsReducer = (
  state: ListMatchStatsState = initialState,
  action: ListMatchStatsAction
): ListMatchStatsState => {
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

export default listMatchStatsReducer;
