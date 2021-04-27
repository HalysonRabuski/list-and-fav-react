import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Card from "../Card";

afterEach(() => {
  cleanup();
});

test("should render card component", () => {
  render(
    <Card id="1" src="https://via.placeholder.com/150" alt="placeholder">
      <p>test</p>
    </Card>
  );
  const cardElement = screen.getByTestId("card-1");
  expect(cardElement).toBeInTheDocument();
  expect(cardElement).toHaveTextContent("test");
});

test("should render card component with an image and texts as children", () => {
  const cardElement = renderer
    .create(
      <Card id="1" src="https://via.placeholder.com/150" alt="placeholder">
        <p>test</p>
      </Card>
    )
    .toJSON();
  expect(cardElement).toMatchSnapshot();
});
