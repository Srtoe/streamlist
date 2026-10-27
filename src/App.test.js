import { render, screen, fireEvent } from "@testing-library/react";
import StreamList from "./pages/StreamList";

beforeEach(() => {
  localStorage.clear();

  Object.defineProperty(globalThis, "crypto", {
    value: {
      randomUUID: jest.fn(() => "test-item-id"),
    },
    configurable: true,
  });
});

test("adds a new item to StreamList", () => {
  render(<StreamList />);

  const input = screen.getByPlaceholderText("Enter a movie or program");

  fireEvent.change(input, {
    target: { value: "Spider-Man" },
  });

  fireEvent.click(screen.getByText(/Add to StreamList/i));

  expect(screen.getByText("Spider-Man")).toBeInTheDocument();
});

test("marks an item as completed", () => {
  render(<StreamList />);

  const input = screen.getByPlaceholderText("Enter a movie or program");

  fireEvent.change(input, {
    target: { value: "Batman" },
  });

  fireEvent.click(screen.getByText(/Add to StreamList/i));
  fireEvent.click(screen.getByText(/Complete/i));

  expect(screen.getByText("Batman")).toHaveStyle(
  "text-decoration: line-through"
);
});

test("deletes an item from StreamList", () => {
  render(<StreamList />);

  const input = screen.getByPlaceholderText("Enter a movie or program");

  fireEvent.change(input, {
    target: { value: "Superman" },
  });

  fireEvent.click(screen.getByText(/Add to StreamList/i));
  fireEvent.click(screen.getByText(/Delete/i));

  expect(screen.queryByText("Superman")).not.toBeInTheDocument();
});
