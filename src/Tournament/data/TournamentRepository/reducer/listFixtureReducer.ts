import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Fixture } from "../types";

type ListFixturePayload = FetchPayload<Fixture[]>;

export type ListFixtureActions = BaseAction<ListFixturePayload>;

type ListFixtureAction = ListFixtureActions[keyof ListFixtureActions];

interface ListFixtureState {
  data: Fixture[];
  loading: boolean;
  error?: string;
}

export const initialState: ListFixtureState = {
  data: [],
  loading: false,
};

const listFixtureReducer = (
  state: ListFixtureState = initialState,
  action: ListFixtureAction
): ListFixtureState => {
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

export default listFixtureReducer;
