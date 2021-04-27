import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Header from "../Header";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(() => {
  cleanup();
});

test("should render header component", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const headerElement = screen.getByTestId("header");
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent("List n' Favorite");
});

test("should render header component like snapshot", () => {
  const headerElement = renderer
    .create(
      <Router>
        <Header />
      </Router>
    )
    .toJSON();
  expect(headerElement).toMatchSnapshot();
});
