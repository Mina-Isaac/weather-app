export const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
export const APPID = '75f972b80e26f14fe6c920aa6a85ad57'
export const city = 'Munich,de'
export const segmentCount= '40'
export const ICON_URL = 'http://openweathermap.org/img/wn/'
//http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40


export const actionTypes = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  SET_TEMP_SCALE: 'SET_TEMP_SCALE',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR',
};

type main = {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

type weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type weatherSegment = {
  dt: number;
  main: main;
  weather: weather[];
  dt_txt: string
}
