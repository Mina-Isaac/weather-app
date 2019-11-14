import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { appState } from "../../Store/reducer";
import { calculateAvTemp, convertTemp } from "../../utilities";
import { weatherSegment } from "../../constants";

export type cardProps = {
  date: number;
  selected: boolean;
  dayData: weatherSegment[];
};
export default function ImgMediaCard(props: cardProps) {
  const { date, selected, dayData } = props;
  const tempScale = useSelector((state: appState) => {
    return state.tempScale;
  });
  const avTempKelvin: number = calculateAvTemp(dayData);
  const avTemp = `${convertTemp(avTempKelvin, tempScale)}°${tempScale}`;
  const useStyles = makeStyles({
    card: {
      maxWidth: 320,
      backgroundColor: `${
        selected ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.5)"
      }`,
      border: "1px solid rgba(255, 255, 255, 0.6)",
      color: "#196090",
      margin: "1% 1%"
    }
  });
  const classes = useStyles();
  //Determinning day from date
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const dayName: string = days[new Date(1000 * date).getDay()];
  const cardDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).format(new Date(1000 * date));

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Box fontWeight="fontWeightBold" letterSpacing={4} fontSize={32}>
            {dayName}
          </Box>
          <Box fontSize={16}>{cardDate}</Box>
          <hr />
          <Box fontWeight="fontWeightBold" fontSize={36}>
            {avTemp}{" "}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
