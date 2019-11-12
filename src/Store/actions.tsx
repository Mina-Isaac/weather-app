import { createAction } from "typesafe-actions";
import { actionTypes, weatherSegment } from "../constatnts";


const getData = createAction(actionTypes.FETCH_DATA);

const setData = createAction(actionTypes.FETCH_DATA_SUCCESS,
  resolve => (data: Array<weatherSegment>) =>
    resolve(data)
);

const dataError = createAction(actionTypes.FETCH_DATA_ERROR,
  resolve => (error: Error) =>
    resolve(error)
);

const setTempScale = createAction(actionTypes.SET_TEMP_SCALE,
  resolve => (scale :string) =>
  resolve(scale)
);

export {
  getData,
  setData,
  dataError,
  setTempScale
};
