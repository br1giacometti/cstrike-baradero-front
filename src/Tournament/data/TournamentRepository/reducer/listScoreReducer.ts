import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Score } from "../types";

type ListScorePayload = FetchPayload<Score[]>;

export type ListScoreActions = BaseAction<ListScorePayload>;

type ListScoreAction = ListScoreActions[keyof ListScoreActions];

interface ListScoreState {
  data: Score[];
  loading: boolean;
  error?: string;
}

export const initialState: ListScoreState = {
  data: [],
  loading: false,
};

const listScoreReducer = (
  state: ListScoreState = initialState,
  action: ListScoreAction
): ListScoreState => {
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

export default listScoreReducer;
