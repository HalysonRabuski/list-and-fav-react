import React from "react";
import { StyledTitle } from "./styles";

function Title(props) {
  return <StyledTitle data-testid="title">{props.text}</StyledTitle>;
}

export default Title;
