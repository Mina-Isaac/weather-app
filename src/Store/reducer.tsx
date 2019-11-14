import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { weatherSegment, Scales } from "../constants";

export type appState = {
  segments: weatherSegment[];
  fetching: boolean;
  tempScale: string;
  selectedDay: number | undefined;
};

export type Action = ActionType<typeof actions>;

export const initialState: appState = {
  segments: [],
  fetching: true,
  tempScale: Scales.Fahrenheit,
  selectedDay: undefined
};

const reducer = (state: appState = initialState, action: any): appState => {
  switch (action.type) {
    case getType(actions.setData):
      return {
        fetching: false,
        segments: action.payload,
        tempScale: state.tempScale,
        selectedDay: state.selectedDay
      };

    case getType(actions.dataError):
      return {
        fetching: false,
        segments: [],
        tempScale: state.tempScale,
        selectedDay: state.selectedDay
      };

    case getType(actions.setTempScale):
      return { ...state, tempScale: action.payload };

    case getType(actions.setSelectedDay):
      return { ...state, selectedDay: action.payload };
    default:
      return state;
  }
};

export default reducer;
