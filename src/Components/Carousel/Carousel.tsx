import React from "react";
import styled from "styled-components";
import { weatherSegment } from "../../constants";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { appState } from "../../Store/reducer";
import { setSelectedDay } from "../../Store/actions";
import Slider from "react-slick";

const Container = styled.div`
  max-width: 80%;
`;
export type CarouselProps = {
  cardData: weatherSegment[][];
};

const Carousel = (props: CarouselProps) => {
  const { cardData } = props;
  const dispatch = useDispatch();
  const selcectedDay = useSelector((state: appState) => {
    return state.selectedDay;
  });

  let cards: Array<JSX.Element> = cardData.map(
    (item: weatherSegment[], i: number) => {
      const selected = i === selcectedDay;
      return (
        <div key={i} onClick={() => dispatch(setSelectedDay(i))}>
          <Card date={item[0].dt} selected={selected} dayData={item} />
        </div>
      );
    }
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Container>
      <Slider {...settings}>{cards}</Slider>
    </Container>
  );
};

export default Carousel;
