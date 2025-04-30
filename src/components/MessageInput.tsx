import { useState, useContext } from "react";
import { SessionContext } from "../contexts/session";
import "./MessageInput.scss";

function MessageInput() {
  const [value, setValue] = useState("");
  const { state } = useContext(SessionContext);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Don't send empty messages or if socket/user isn’t set up
    if (!value.trim() || !state.socket || !state.username) return;

    // Emit the message through the socket
    state.socket.emit("message", `${state.username}: ${value}`);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className="message-input">
      <input
        autoFocus
        value={value}
        type="text"
        name="message"
        onChange={(e) => setValue(e.target.value)}
        id="message"
      />
      <button className="message-send">Send</button>
    </form>
  );
}

export default MessageInput;
