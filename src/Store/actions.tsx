import { createAction } from "typesafe-actions";
import { ActionTypes, Scales, weatherSegment } from "../constants";

const getData = createAction(ActionTypes.FETCH_DATA);

const setData = createAction(
  ActionTypes.FETCH_DATA_SUCCESS,
  resolve => (data: weatherSegment[][]) => resolve(data)
);

const dataError = createAction(
  ActionTypes.FETCH_DATA_ERROR,
  resolve => (error: Error) => resolve(error)
);

const setTempScale = createAction(
  ActionTypes.SET_TEMP_SCALE,
  resolve => (scale: Scales) => resolve(scale)
);

const setSelectedDay = createAction(
  ActionTypes.SET_SELECTED_DAY,
  resolve => (index: number | undefined) => resolve(index)
);

export { getData, setData, dataError, setTempScale, setSelectedDay };
