import { useState, useContext } from "react";
import { SessionContext } from "../contexts/session";
import "./MessageInput.scss";

function MessageInput() {
  const [value, setValue] = useState("");
  const { state } = useContext(SessionContext);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || !state.socket || !state.username) return;
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
