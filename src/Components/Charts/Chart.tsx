import React from "react";
import { Bar } from "react-chartjs-2";
import { weatherSegment } from "../../constants";
import styled from "styled-components";
import { convertTemp } from "../../utilities";
import { useSelector } from "react-redux";
import { appState } from "../../Store/reducer";
import { offset } from "../App/App";
import "chartjs-plugin-datalabels";

export type DayData = {
  day: weatherSegment[];
};

const Stretched = styled.div`
  align-self: stretch;
  padding: 0 2%;
`;

const Chart = (props: DayData) => {
  //Getting an array of labels representing weather segments present in the received data
  //The resulting labels are a bit lengthy, a time formatter could be used to shorten them

  const labels = props.day.map(
    item => `${new Date(item.dt * 1000 + offset).toLocaleTimeString()}`
  );
  const tempScale = useSelector((state: appState) => {
    return state.tempScale;
  });

  const label = `Temperature in °${tempScale}`;
  const chartData = props.day.map(item =>
    convertTemp(item.main.temp, tempScale)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature across the day",
        backgroundColor: "rgba(255,99,132,0.5)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: chartData
      }
    ]
  };
  return (
    <Stretched>
      <Bar
        data={data}
        width={120}
        height={70}
        options={{
          legend: {
            display: false
          },
          plugins: {
            datalabels: {
              display: true,
              color: "white",
              anchor: "end",
              align: "start"
            }
          },
          tooltips: {
            enabled: false
          },
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: label
                }
              }
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true
                  //labelString: 'Time'
                }
              }
            ]
          }
        }}
      />
    </Stretched>
  );
};

export default Chart;
