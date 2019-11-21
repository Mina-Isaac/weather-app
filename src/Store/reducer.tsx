import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { weatherSegment, Scales } from "../constants";

export type appState = {
  groupedSegments: weatherSegment[][];
  fetching: boolean;
  tempScale: string;
  selectedDay: number | undefined;
};

export type Action = ActionType<typeof actions>;

export const initialState: appState = {
  groupedSegments: [],
  fetching: true,
  tempScale: Scales.Fahrenheit,
  selectedDay: undefined
};

const reducer = (state: appState = initialState, action: any): appState => {
  switch (action.type) {
    case getType(actions.setData):
      return {
        fetching: false,
        groupedSegments: action.payload,
        tempScale: state.tempScale,
        selectedDay: state.selectedDay
      };

    case getType(actions.dataError):
      return {
        fetching: false,
        groupedSegments: [],
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
