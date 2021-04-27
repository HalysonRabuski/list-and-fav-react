import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Footer from "../Footer";

afterEach(() => {
  cleanup();
});

test("should render footer component", () => {
  render(<Footer />);
  const footerElement = screen.getByTestId("footer");
  expect(footerElement).toBeInTheDocument();
  expect(footerElement).toHaveTextContent("Halyson");
});

test("should render footer component like snapshot", () => {
  const footerElement = renderer.create(<Footer />).toJSON();
  expect(footerElement).toMatchSnapshot();
});
