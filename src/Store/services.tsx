import { API_URL, APPID, city, segmentCount } from "../constatnts";


export class appServices {
  static fetchDataFromAPI() {
    const url = `${API_URL + city}&APPID=${APPID}&cnt=${segmentCount}`;
    return fetch(url).then((res) => res.json().then((data) => data));
  }
}
