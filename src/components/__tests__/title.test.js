import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Title from "../Title";

afterEach(() => {
  cleanup();
});

test("should render title component", () => {
  render(<Title text="test" />);
  const titleElement = screen.getByTestId("title");
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent("test");
});

test("should render title component like snapshot", () => {
  const titleElement = renderer.create(<Title />).toJSON();
  expect(titleElement).toMatchSnapshot();
});
