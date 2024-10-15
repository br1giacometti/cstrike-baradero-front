import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";
import { MatchDay } from "MatchDay/data/MatchDayRepository";

type ListMatchDayPayload = FetchPayload<MatchDay[]>;

export type ListMatchDayActions = BaseAction<ListMatchDayPayload>;

type ListMatchDayAction = ListMatchDayActions[keyof ListMatchDayActions];

interface ListMatchDayState {
  data: MatchDay[];
  loading: boolean;
  error?: string;
}

export const initialState: ListMatchDayState = {
  data: [],
  loading: false,
};

const listMatchDayReducer = (
  state: ListMatchDayState = initialState,
  action: ListMatchDayAction
): ListMatchDayState => {
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

export default listMatchDayReducer;
