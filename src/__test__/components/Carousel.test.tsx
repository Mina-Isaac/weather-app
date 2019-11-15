import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../Store/reducer";
import Carousel, { CarouselProps } from "../../Components/Carousel/Carousel";
import { mockWeatherSegment } from "../store/reducer.test";
import renderer from "react-test-renderer";

const mockStore = configureStore();
let store: any;

const props: CarouselProps = {
  cardData: [[mockWeatherSegment]]
};

describe("Carousel component should render without issues", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Carousel {...props} />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Carousel {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
