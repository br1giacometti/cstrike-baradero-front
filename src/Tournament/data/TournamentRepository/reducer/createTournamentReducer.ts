import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Tournament } from "../types";

type CreateTournamentPayload = FetchPayload<Tournament> & {
  CLEAN_ERROR: undefined;
};

export type CreateTournamentActions = BaseAction<CreateTournamentPayload>;

type CreateTournamentAction =
  CreateTournamentActions[keyof CreateTournamentActions];

interface CreateTournamentState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateTournamentState = {
  loading: false,
};

const createTournamentReducer = (
  state: CreateTournamentState = initialState,
  action: CreateTournamentAction
): CreateTournamentState => {
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

export default createTournamentReducer;
