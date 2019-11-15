import * as actions from "../../Store/actions";
import { ActionTypes } from "../../constants";
const recievedDataSample = [
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
      temp_kf: 0
    },
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "10d"
      }
    ],
    dt_txt: ""
  }
];

describe("actions", () => {
  it("should create an action with type:FETCH_DATA", () => {
    const action = actions.getData();
    expect(action).toEqual({
      payload: undefined,
      type: ActionTypes.FETCH_DATA
    });
  });
  it("should create an action with type:FETCH_DATA_SUCCESS", () => {
    const action = actions.setData(recievedDataSample);
    expect(action).toEqual({
      payload: recievedDataSample,
      type: ActionTypes.FETCH_DATA_SUCCESS
    });
    expect(action.payload).toHaveLength(1);
    expect(typeof action.payload).toBe("object");
  });
  it("should create an action with type:FETCH_DATA_ERROR", () => {
    const action = actions.dataError(new Error(""));
    expect(action).toEqual({
      payload: new Error(""),
      type: ActionTypes.FETCH_DATA_ERROR
    });
    expect(typeof action.payload).toBe("object");
  });
  it("should create an action with type:SET_TEMP_SCALE", () => {
    const action = actions.setTempScale("some String");
    expect(action).toEqual({
      payload: "some String",
      type: ActionTypes.SET_TEMP_SCALE
    });
    expect(typeof action.payload).toBe("string");
  });
  it("should create an action with type:SET_SELECTED_DAY", () => {
    const action = actions.setSelectedDay(4);
    expect(action).toEqual({
      payload: 4,
      type: ActionTypes.SET_SELECTED_DAY
    });
    expect(typeof action.payload).toBe("number");
  });
});
