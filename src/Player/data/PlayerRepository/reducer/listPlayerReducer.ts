import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Player } from "../types";

type ListPlayerPayload = FetchPayload<Player[]>;

export type ListPlayerActions = BaseAction<ListPlayerPayload>;

type ListPlayerAction = ListPlayerActions[keyof ListPlayerActions];

interface ListPlayerState {
  data: Player[];
  loading: boolean;
  error?: string;
}

export const initialState: ListPlayerState = {
  data: [],
  loading: false,
};

const listPlayerReducer = (
  state: ListPlayerState = initialState,
  action: ListPlayerAction
): ListPlayerState => {
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

export default listPlayerReducer;
