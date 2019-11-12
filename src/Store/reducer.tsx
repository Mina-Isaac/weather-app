import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { weatherSegment } from '../constatnts'

export type appState = {
  segments: weatherSegment[];
  fetching: boolean;
  tempScale: string;
}

type Action = ActionType<typeof actions>;

const initialData: weatherSegment[] = [
  {
    dt: 0,
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      sea_level: 0,
      grnd_level: 0,
      humidity: 0,
      temp_kf: 0,
    },
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "10d"
      }
    ],
    dt_txt: ''
  }
];


const initialState = {
  segments: initialData,
  fetching: true,
  tempScale: 'F'
}

const reducer = (
  state: appState = initialState,
  action: any
): appState => {
  switch (action.type) {

    case getType(actions.setData):
      return { fetching: false, segments: action.payload, tempScale: state.tempScale }

    case getType(actions.setTempScale):
      return { ...state, tempScale: action.payload }
    default:
      return state;
  }
};

export default reducer;
