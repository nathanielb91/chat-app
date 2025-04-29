import { useContext } from "react";
import { SessionContext } from "./contexts/session";
import Username from "./components/Username";
import Chat from "./layout/Chat";
import "./App.scss";

function App() {
  const { state } = useContext(SessionContext);

  if (!state.username) {
    return (
      <div className="app">
        <div className="flex-center">
          <Username />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Chat />
    </div>
  );
}

export default App;
