import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Content from "../Content";

afterEach(() => {
  cleanup();
});

test("should render content component", () => {
  render(
    <Content>
      <p>test</p>
    </Content>
  );
  const contentElement = screen.getByTestId("content");
  expect(contentElement).toBeInTheDocument();
  expect(contentElement).toHaveTextContent("test");
});

test("should render content component with its children", () => {
  const contentElement = renderer
    .create(
      <Content>
        <p>test</p>
      </Content>
    )
    .toJSON();
  expect(contentElement).toMatchSnapshot();
});
