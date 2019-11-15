import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../Store/reducer";
import Switch from "../../Components/Switch/Switch";
import renderer from "react-test-renderer";
const mockStore = configureStore();
let store: any;

describe("Switch component should render without issues", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Switch />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Switch />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
