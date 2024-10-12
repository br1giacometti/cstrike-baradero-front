import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Team } from "../types";

type ListTeamPayload = FetchPayload<Team[]>;

export type ListTeamActions = BaseAction<ListTeamPayload>;

type ListTeamAction = ListTeamActions[keyof ListTeamActions];

interface ListTeamState {
  data: Team[];
  loading: boolean;
  error?: string;
}

export const initialState: ListTeamState = {
  data: [],
  loading: false,
};

const listTeamReducer = (
  state: ListTeamState = initialState,
  action: ListTeamAction
): ListTeamState => {
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

export default listTeamReducer;
