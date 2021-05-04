import React from "react";
import styled from "styled-components";
import { appState } from "../../Store/reducer";
import { useSelector, useDispatch } from "react-redux";
import { setTempScale } from "../../Store/actions";
import { Scales } from "../../constants";

const Switcher = styled.fieldset`
  position: relative;
  top: 1em;
  width: 120px;
  height: 40px;
  margin-bottom: 1em;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  border: 4px solid rgba(255, 255, 255, 0.4);
  padding: 0;
  box-sizing: content-box;
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }
`;
const SwitcherInput = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -10;
`;
const SwitcherLbl = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 40px;
  opacity: 0;
  cursor: pointer;
`;

interface SwitcherBGI {
  tempSys: Scales;
}
const SwitcherBG = styled.span<SwitcherBGI>`
  position: absolute;
  z-index: 0;
  width: 50%;
  height: inherit;
  left: ${(props) => (props.tempSys === Scales.Fahrenheit ? "50%" : "0")};
  background: #3498db;
  transition: all 0.3s;
  border-radius: 5px;
`;
const SwitcherLbls = styled.span`
  position: absolute;
  z-index: 1;
  width: inherit;
  height: inherit;
  &:before,
  &:after {
    height: 40px;
    width: 50%;
    line-height: 40px;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    text-align: center;
  }
  &:before {
    content: attr(data-on);
    left: 0;
    position: absolute;
    color: darken(#fff, 30%);
  }
  &:after {
    content: attr(data-off);
    position: absolute;
    right: 0;
    color: #fff;
  }
`;

const Switch: React.FC = () => {
  const tempSys = useSelector((state: appState) => state.tempScale);
  const dispatch = useDispatch();
  const handleInputChange = () =>
    dispatch(
      setTempScale(
        tempSys === Scales.Celsius ? Scales.Fahrenheit : Scales.Celsius
      )
    );
  return (
    <Switcher>
      <SwitcherInput
        name="celsius-fehrenhite-converter"
        id="switch"
        type="checkbox"
        onChange={handleInputChange}
      />
      <SwitcherLbl htmlFor="switch"></SwitcherLbl>
      <SwitcherBG aria-hidden="true" tempSys={tempSys}></SwitcherBG>
      <SwitcherLbls
        data-on={" °" + Scales.Celsius}
        data-off={" °" + Scales.Fahrenheit}
        aria-hidden="true"
      ></SwitcherLbls>
    </Switcher>
  );
};

export default Switch;
