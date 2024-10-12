import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Tournament } from "../types";

type ListTournamentPayload = FetchPayload<Tournament[]>;

export type ListTournamentActions = BaseAction<ListTournamentPayload>;

type ListTournamentAction = ListTournamentActions[keyof ListTournamentActions];

interface ListTournamentState {
  data: Tournament[];
  loading: boolean;
  error?: string;
}

export const initialState: ListTournamentState = {
  data: [],
  loading: false,
};

const listTournamentReducer = (
  state: ListTournamentState = initialState,
  action: ListTournamentAction
): ListTournamentState => {
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

export default listTournamentReducer;
