import { render, screen, fireEvent } from "@testing-library/react";
import MessageInput from "../MessageInput";
import { SessionContext } from "../../contexts/session";
import { Socket } from "socket.io-client";

describe("MessageInput component", () => {
  it("clears message input after submit", () => {
    const mockEmit = jest.fn();
    const mockSocket = { emit: mockEmit } as unknown as Socket;

    render(
      <SessionContext.Provider
        value={{
          state: {
            socket: mockSocket,
            username: "TestUser",
            messages: [],
          },
          dispatch: jest.fn(),
        }}
      >
        <MessageInput />
      </SessionContext.Provider>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello!" } });
    fireEvent.submit(input);

    expect(mockEmit).toHaveBeenCalledWith("message", "TestUser: Hello!");
    expect(input).toHaveValue("");
  });
});
