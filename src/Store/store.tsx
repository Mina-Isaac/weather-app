import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
} from "redux";
import { createEpicMiddleware } from "redux-observable";
import { fetchWeatherSegmentsFlow } from "./epic";
import { ActionType } from "typesafe-actions";
import { appServices } from "./services";
import * as actions from './actions'
import reducer, { appState } from './reducer'

type Action = ActionType<typeof actions>;


const epicMiddleware = createEpicMiddleware<Action, Action, appState>({
  dependencies: { service: appServices }
});
const middleware: [Middleware] = [epicMiddleware];

const configStore = () => {
  const createStoreWithMiddleware = compose(applyMiddleware(...middleware))(
    createStore
  );
  const store = createStoreWithMiddleware(reducer);
  epicMiddleware.run(fetchWeatherSegmentsFlow);

  return {
    store
  };
};
const { store } = configStore();
export { store };
