import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../Store/reducer";
import Loader from "../../Components/Loader/Loader";
import renderer from "react-test-renderer";
const mockStore = configureStore();
let store: any;

describe("Loader component should render without issues", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Loader />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Loader />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
