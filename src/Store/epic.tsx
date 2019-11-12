import { of, from } from "rxjs";
import { Epic } from "redux-observable";
import * as actions from "./actions";
import {
  catchError,
  map,
  filter,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";
import { appState } from "./reducer";


type Action = ActionType<typeof actions>;
const propertyFilter = ['dt', 'main', 'weather', 'dt_txt']

export const fetchWeatherSegmentsFlow: Epic<Action, Action, appState, any> = (
  action$,
  state$,
  { service }
) =>
  action$.pipe(
    filter(isActionOf(actions.getData)),
    withLatestFrom(state$),
    switchMap(arr =>
      from(service.fetchDataFromAPI()).pipe(
        map((data: any) => {
          const list = data.list;
          const filtered = list.map((item: any) => {
            const holder: any = {}
            for (let prop in item) {
              if (propertyFilter.includes(prop)) holder[prop] = item[prop]
            }
            return holder
          })
          return filtered
        }),
        map(actions.setData),
        catchError(error => of(actions.dataError(error)))
      )
    )
  );
