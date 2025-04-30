import { useContext, useRef, useEffect } from "react";
import { SessionContext } from "../contexts/session";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import "./Chat.scss";
import { removeLocalStorage } from "../lib/storage";

function Chat() {
  // Get current app state (username, messages, socket) from context
  const { state } = useContext(SessionContext);

  // Ref for auto scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    removeLocalStorage("username");
    window.location.reload();
  };
  
  // Auto scroll chat to the newest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-username">
          Logged in as <strong>{state.username}</strong>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>

      <div className="chat-messages">
        {state.messages.map((msg, index) => (
        <Message
          key={index}
          sender={msg.sender}
          text={msg.text}
          isOwnMessage={msg.sender === state.username}
          timestamp={msg.timestamp}
        />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default Chat;
