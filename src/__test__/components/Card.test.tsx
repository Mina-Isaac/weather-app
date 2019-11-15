import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../Store/reducer";
import Card, { cardProps } from "../../Components/Card/Card";
import { mockWeatherSegment } from "../store/reducer.test";
import renderer from "react-test-renderer";

const props: cardProps = {
  date: 454545,
  selected: true,
  dayData: [mockWeatherSegment]
};

const mockStore = configureStore();
let store: any;

describe("Card component should render without issues", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Card {...props} />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Card {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
