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
          const temp = list.map((item: any) => {
            const holder: any = {}
            for (let p in item) {
              if (p === 'dt' || p === 'main' || p === 'weather' || p === 'dt_txt') holder[p] = item[p]
            }
            return holder
          })
          return temp
        }),
        map(actions.setData),
        catchError(error => of(actions.dataError(error)))
      )
    )
  );
