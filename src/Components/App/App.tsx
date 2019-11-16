import React, { useEffect } from "react";
import background from "./background.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../Store/actions";
import { appState } from "../../Store/reducer";
import { weatherSegment } from "../../constants";
import Switch from "../Switch/Switch";
import Chart from "../Charts/Chart";
import * as utilities from "../../utilities";
import Loader from "../Loader/Loader";
import Carousel from "../Carousel/Carousel";
import ShortCard from "./ShortCard";
//import data from '../../sampleData'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  background-image: ${"url(" + background + ")"};
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const Wraper = styled.div`
  min-width: 85%;
  margin-top: 1%;
  overflow: hidden;
  border: 1px dashed gray;
  padding: 3px;
`;

export const offset = 1000 * 60 * new Date(Date.now()).getTimezoneOffset();

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const data: weatherSegment[] = useSelector((state: appState) => {
    return state.segments;
  });

  const loading = useSelector((state: appState) => {
    return state.fetching;
  });

  const selectedDay = useSelector((state: appState) => {
    return state.selectedDay;
  });

  let closestSegmentToNow: weatherSegment | undefined;

  //Grouping weather segments by date in order to facilitate further data processing
  const groupedData: weatherSegment[][] = utilities.groupSegmentsByDate(data);
  console.log(data);

  //Finding the wether segment that represents the present moment more closely (within 1.5 hours)
  if (groupedData.length)
    closestSegmentToNow = utilities.findClosestSegmentToNow(groupedData[0]);

  //Rendering an element to diplay the current weather if it is included
  //in the data received from the API
  const currentWeather = closestSegmentToNow ? (
    <ShortCard
      description={closestSegmentToNow.weather[0].description}
      icon={closestSegmentToNow.weather[0].icon}
    />
  ) : null;

  return (
    <Container className="App">
      {(loading && <Loader />) || (
        <>
          {(data.length > 0 && (
            <>
              <Switch />
              <br />
              {currentWeather}
              <Carousel cardData={groupedData} />
              {(selectedDay !== undefined && (
                <Wraper>
                  <Chart day={groupedData[selectedDay]} />
                </Wraper>
              )) ||
                null}
            </>
          )) || (
            <div>
              <h1>Error</h1> <h4>Could not retrieve data from server</h4>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
