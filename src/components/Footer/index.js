import React from "react";
import { StyledFooter, GitHubIcon } from "./styles.js";
import Title from "../Title";

function AppFooter() {
  return (
    <>
      <StyledFooter data-testid="footer">
        <Title level={4} text="Halyson" />
        <div className="social">
          <a href="https://github.com/HalysonRabuski" target="_blank">
            <GitHubIcon />
          </a>
        </div>
      </StyledFooter>
    </>
  );
}

export default AppFooter;
