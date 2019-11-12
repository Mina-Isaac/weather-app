import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { weatherSegment, Scales } from '../constants'

export type appState = {
  segments: weatherSegment[];
  fetching: boolean;
  tempScale: string;
}

export type Action = ActionType<typeof actions>;

export const initialState = {
  segments: [],
  fetching: true,
  tempScale: Scales.Fahrenheit
}

const reducer = (
  state: appState = initialState,
  action: any
): appState => {
  switch (action.type) {

    case getType(actions.setData):
      return { fetching: false, segments: action.payload, tempScale: state.tempScale }

    case getType(actions.dataError):
      return { fetching: false, segments: [], tempScale: state.tempScale }

    case getType(actions.setTempScale):
      return { ...state, tempScale: action.payload }
    default:
      return state;
  }
};

export default reducer;
