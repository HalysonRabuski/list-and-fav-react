import React from "react";
import { StyledContent } from "./styles.js";

function Content(props) {
  return (
    <>
      <StyledContent data-testid={`content`}>{props.children}</StyledContent>
    </>
  );
}

export default Content;
