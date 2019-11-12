import React, { useEffect } from 'react';
import logo from './background.svg';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getData, setTempScale } from '../../Store/actions';
import { appState } from '../../Store/reducer';
import Card from '../Card/Card'
import { weatherData } from './data'
import Slider from '../Slide/Slide'
import { weatherSegment } from '../../constants'
import Switch from './Switch';

const BackMap = styled.img`
position: absolute;
margin: 0 auto;
top: 0;
right: 0;
bottom: 0;
left: 0;
width:100%;
pointer-events: none;
`
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

const App: React.FC = () => {

  const dispatch = useDispatch()

  //useEffect(() => { dispatch(getData()) }, [])

  const data = useSelector((state: appState) => {
    return state.segments;
  });

  const tScale = useSelector((state: appState) => {
    return state.tempScale;
  });

  const loading = useSelector((state: appState) => {
    return state.fetching;
  });

  let closestSegmentToNow: weatherSegment | undefined;

  const groupedData = weatherData
  //groupSegmentsByDate(data);


  let cards;

  if (groupedData.length) cards = groupedData.map((item: weatherSegment[], i: number) => {
    const avTemp: number = calculateAvTemp(item);

    if (!i) closestSegmentToNow = findClosestSegmentToNow(item)

    return <Card
      key={i}
      avTemp={`${convertTemp(avTemp, tScale)}°${tScale}`}
      date={item[0].dt}
      tempNow={`${convertTemp(closestSegmentToNow!.main.temp, tScale)}°${tScale}`}
      icon={closestSegmentToNow!.weather[0].icon}
      description={closestSegmentToNow!.weather[0].description}
    />

  })

  return (
    <Container className="App">
      <BackMap src={logo} className="App-logo" alt="logo" />
      {loading || !(groupedData.length) ? <div>Loading...</div> : <>
        <Switch />
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>

        </header>
      </>}
      <Slider />
      {cards}
    </Container>
  );
}

export default App;

function findClosestSegmentToNow(dayData: weatherSegment[]): weatherSegment | undefined {
  return dayData.find(finder);
  function finder(item: weatherSegment): boolean {
    const nowInSeconds = Date.now() / 1000;
    return Math.abs(item.dt - nowInSeconds) <= (3 * 60 * 60);
  }
}

function calculateAvTemp(dayData: weatherSegment[]) {
  let summedTemp: number = 0;
  dayData.forEach((item: weatherSegment) => summedTemp += item.main.temp);
  return summedTemp / dayData.length
}

function groupSegmentsByDate(data: weatherSegment[]): weatherSegment[][] {
  const groupedData = [];
  const numberOfIterations = Math.ceil(data.length / 8)
  for (let i = 0; i < numberOfIterations; i += 1) {
    groupedData.push(data.slice(8 * i, 8 * i + 8));
  }
  return groupedData
}
function convertTemp(value: number, tempScale: string): string {
  const cTemp = value - 273.15
  if (tempScale === 'C') return cTemp.toFixed(1)
  return (1.8 * cTemp + 32).toFixed(1)
}

