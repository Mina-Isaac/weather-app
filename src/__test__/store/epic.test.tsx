import { StateObservable, ActionsObservable } from 'redux-observable';
import { Subject } from 'rxjs';
import * as actions from "../../Store/actions";
import { appState, initialState } from '../../Store/reducer';
import { fetchWeatherSegmentsFlow } from '../../Store/epic';
import { weatherSegment } from '../../constants';

const mockWeatherSegment: weatherSegment = {
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

const mockResponse = {
  "cod": "200",
  "message": 0,
  "cnt": 1,
  "list": [
      {
          "dt": 1573581600,
          "main": {
              "temp": 276.03,
              "temp_min": 275.76,
              "temp_max": 276.03,
              "pressure": 1007,
              "sea_level": 1007,
              "grnd_level": 934,
              "humidity": 85,
              "temp_kf": 0.27
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04n"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 1.28,
              "deg": 119
          },
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2019-11-12 18:00:00"
      }
  ],
  "city": {
      "id": 2867714,
      "name": "Munich",
      "coord": {
          "lat": 48.1371,
          "lon": 11.5754
      },
      "country": "DE",
      "population": 1260391,
      "timezone": 3600,
      "sunrise": 1573539316,
      "sunset": 1573573228
  }
}

let state$: StateObservable<appState>;
let service: any;
describe('Weather Segments Epic', () => {
  beforeEach(() => {
    state$ = new StateObservable<appState>(new Subject(), initialState);
    service = { fetchDataFromAPI: jest.fn() };
   });

  it("should dispatch setData action when weather segment data is received", done => {
    service.fetchDataFromAPI.mockReturnValue(Promise.resolve(mockResponse));
    const action$ = ActionsObservable.of(actions.getData());
    const expectedOutputActions = actions.setData([mockWeatherSegment]);
    fetchWeatherSegmentsFlow(action$, state$, { service }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe(expectedOutputActions.type);
      done();
    });

  });
  it("should dispatch dataError action when the request fails or response type is wrong", done => {
    service.fetchDataFromAPI.mockReturnValue(Promise.resolve(new Error('error occured')));
    const action$ = ActionsObservable.of(actions.getData());
    const expectedOutputAction = actions.dataError(new Error());
    fetchWeatherSegmentsFlow(action$, state$, { service }).subscribe(actionReceived => {
      expect(actionReceived.type).toBe(expectedOutputAction.type);
      done();
    });

  });
});
