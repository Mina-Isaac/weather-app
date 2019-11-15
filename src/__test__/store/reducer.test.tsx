import reducer, { appState } from '../../Store/reducer';
import * as actions from "../../Store/actions";
import { weatherSegment, Scales } from '../../constants';

export const mockWeatherSegment: weatherSegment = {
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
const getInitialState = (initial?: Partial<appState>) =>
reducer(initial as appState, {} as any);

describe('Reducer data flow', () => {
  describe('initial state', () => {
    it('should match a snapshot', () => {
      const initialState = getInitialState();
      expect(initialState).toMatchSnapshot();
    });
  });

  it('should put retrieved data in the store and set fetching flag to false with action setData', () => {
    const initialState = getInitialState();
    initialState.fetching = true;
    expect(initialState.segments).toHaveLength(0);
    const state = reducer(initialState, actions.setData([mockWeatherSegment]));
    expect(state.segments).toHaveLength(1);
    expect(state.fetching).toBeFalsy();
  });
  it('should set segment property to be [] and set fetching flag to false with action dataError', () => {
    const initialState = getInitialState();
    initialState.fetching = true;
    initialState.segments = [mockWeatherSegment];
    const state = reducer(initialState, actions.dataError((new Error('some error occurred'))));
    expect(state.segments).toHaveLength(0);
    expect(state.fetching).toBeFalsy();
  });
  it('should have Fahrenheit as default scale and set temperature scale with action setTempScale', () => {
    const initialState = getInitialState();
    expect(initialState.tempScale).toBe(Scales.Fahrenheit);
    const state = reducer(initialState, actions.setTempScale(Scales.Celsius));
    expect(state.tempScale).toBe(Scales.Celsius);
  });
  it('should have undefined as the default selectedDay and set it with action setSelectedDay', () => {
    const initialState = getInitialState();
    expect(initialState.selectedDay).toBe(undefined);
    const selectedDay=4;
    const state = reducer(initialState, actions.setSelectedDay(4));
    expect(state.selectedDay).toBe(selectedDay);
  });
});
