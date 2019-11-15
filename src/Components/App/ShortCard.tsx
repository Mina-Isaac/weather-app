import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import { ICON_URL } from "../../constants";

type Props = {
  description: string;
  icon: string;
};

export default function ImgMediaCard(props: Props) {
  const { description, icon } = props;

  const useStyles = makeStyles({
    card: {
      maxWidth: '100%',
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      color: "#196090",
      marginBottom: "1%"
    }
  });
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          maxHeight={3}
          fontWeight="fontWeightBold"
          //letterSpacing={1}
          fontSize={20}
        >
          {`Weather now: ${description}`}
          <img src={`${ICON_URL + icon}.png`} alt="weather icon" />
        </Box>
      </CardContent>
    </Card>
  );
}
