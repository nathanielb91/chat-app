import { render, screen, fireEvent } from "@testing-library/react";
import Username from "../Username";
import { SessionContext } from "../../contexts/session";

describe("Username component", () => {
  it("renders the form", () => {
    render(
      <SessionContext.Provider
        value={{
          state: {
            username: null,
            messages: [],
            socket: null,
          },
          dispatch: jest.fn(),
        }}
      >
        <Username />
      </SessionContext.Provider>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it("disables button for invalid username", () => {
    render(
      <SessionContext.Provider
      value={{
        state: {
          username: null,
          messages: [],
          socket: null,
        },
        dispatch: jest.fn(),
      }}
    >
        <Username />
      </SessionContext.Provider>
    );

    const input = screen.getByLabelText(/username/i);
    const button = screen.getByRole("button", { name: /let's chat/i });

    fireEvent.change(input, { target: { value: "!@#$%" } });
    expect(button).toBeDisabled();
  });

  it("enables button for valid username", () => {
    render(
      <SessionContext.Provider
      value={{
        state: {
          username: null,
          messages: [],
          socket: null,
        },
        dispatch: jest.fn(),
      }}
    >
        <Username />
      </SessionContext.Provider>
    );

    const input = screen.getByLabelText(/username/i);
    const button = screen.getByRole("button", { name: /let's chat/i });

    fireEvent.change(input, { target: { value: "validUsername" } });
    expect(button).not.toBeDisabled();
  });
});
