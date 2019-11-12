import { createAction } from "typesafe-actions";
import { ActionTypes, weatherSegment } from "../constants";


const getData = createAction(ActionTypes.FETCH_DATA);

const setData = createAction(ActionTypes.FETCH_DATA_SUCCESS,
  resolve => (data: Array<weatherSegment>) =>
    resolve(data)
);

const dataError = createAction(ActionTypes.FETCH_DATA_ERROR,
  resolve => (error: Error) =>
    resolve(error)
);

const setTempScale = createAction(ActionTypes.SET_TEMP_SCALE,
  resolve => (scale :string) =>
  resolve(scale)
);

export {
  getData,
  setData,
  dataError,
  setTempScale
};
