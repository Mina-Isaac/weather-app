import { createAction } from "typesafe-actions";
import { ActionTypes, weatherSegment } from "../constants";

const getData = createAction(ActionTypes.FETCH_DATA);

const setData = createAction(
  ActionTypes.FETCH_DATA_SUCCESS,
  resolve => (data: Array<weatherSegment>) => resolve(data)
);

const dataError = createAction(
  ActionTypes.FETCH_DATA_ERROR,
  resolve => (error: Error) => resolve(error)
);

const setTempScale = createAction(
  ActionTypes.SET_TEMP_SCALE,
  resolve => (scale: string) => resolve(scale)
);

const setSelectedDay = createAction(
  ActionTypes.SET_SELECTED_DAY,
  resolve => (index: number) => resolve(index)
);

export { getData, setData, dataError, setTempScale, setSelectedDay };
