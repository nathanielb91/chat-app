import { useContext, useState } from "react";
import { SessionContext } from "../contexts/session";
import "./Username.scss";

function Username() {
  const { dispatch } = useContext(SessionContext);

  // Local state to track username input and whether user has interacted with it
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);

  // validation: letters, numbers, underscores, 1–15 chars
  const isValid = /^[a-zA-Z0-9_]{1,15}$/.test(username);
  const showError = touched && !isValid;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();

    // Don’t proceed if name is invalid/empty
    if (!isValid || !trimmed) return;

    // Store username in context
    dispatch({ type: "SET_USERNAME", payload: trimmed });
  };

  return (
    <div className="username-wrapper">
      <form onSubmit={onSubmit} className="username-form">
        <h1 className="title">Join the Chat</h1>
        <p className="subtitle">Pick a name and jump in</p>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            maxLength={15}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched(true)}
            autoFocus
          />
          <span className={`input-error ${showError ? 'show' : ''}`}>
            Only letters, numbers, and underscores (1–15 characters)
          </span>

        </div>
        <button type="submit" disabled={!isValid}>
          Let's Chat!
        </button>
      </form>
    </div>
  );
}

export default Username;
